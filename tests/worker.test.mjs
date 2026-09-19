/* اختبار منطق الـ Worker من غير ما ننشر على Cloudflare.
   بنستبدل fetch العام بـ mock عشان نتأكد إن الكود صح قبل النشر. */

const worker = (await import('../worker.js')).default;

let lastCall = null;

/* بنشتغل fetch المزيّف. الـ handler بيرجّع دالة بتعمل Response جديد
   كل مرة — لأن جسم Response بيتقرا مرة واحدة بس. */
/* المهم: كل نداء لازم ياخد Response جديد. لو رجّعنا نفس الكائن،
   جسمه بيتقرا مرة واحدة وبعدين بيرمي "Body is unusable" — وده كان
   بيلخبط الاختبارات (بيظهر كأنه رد فاضي). */
function installFetch(factory) {
  globalThis.fetch = async (url, init) => {
    lastCall = { url, init, body: JSON.parse(init.body) };
    return factory();
  };
}

/* رد ناجح من Gemini — بيرجّع دالة عشان كل نداء ياخد Response جديد */
function geminiOk(text) {
  return () => new Response(
    JSON.stringify({ candidates: [{ content: { parts: [{ text: text }] }, finishReason: 'STOP' }] }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

/* رد بخطأ من Gemini */
function geminiError(status, message) {
  return () => new Response(
    JSON.stringify({ error: { message: message } }),
    { status: status, headers: { 'Content-Type': 'application/json' } }
  );
}

/* رد ناجح HTTP بس من غير نص (الفلتر الأمني) */
function geminiSafety() {
  return () => new Response(
    JSON.stringify({ candidates: [{ finishReason: 'SAFETY' }] }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

/* المصانع بتترجع مرة واحدة لكل نداء — نستدعيها داخل fetch */
const post = (body, url = 'https://w.dev/') => new Request(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
});

const results = [];
const check = (name, pass, extra = '') => {
  results.push((pass ? 'PASS' : 'FAIL') + '  ' + name + (extra ? '  -> ' + extra : ''));
};

/* 1) المسار السعيد ------------------------------------------------------- */
installFetch(geminiOk('Moataz knows HTML, CSS and JavaScript.'));
let res = await worker.fetch(post({ message: 'What skills?' }), { GEMINI_API_KEY: 'k' });
let data = await res.json();

check('happy path: 200', res.status === 200, res.status);
check('happy path: reply text', data.reply === 'Moataz knows HTML, CSS and JavaScript.', JSON.stringify(data));
check('key NOT in request URL', !lastCall.url.includes('k'));
check('key sent as x-goog-api-key header', lastCall.init.headers['x-goog-api-key'] === 'k');
check('system prompt sent', Boolean(lastCall.body.systemInstruction));
check('correct model endpoint', lastCall.url.includes('gemini-2.5-flash:generateContent'), lastCall.url);

/* 2) CORS — دي كانت سبب إن المتصفح يرفض ------------------------------- */
check('CORS header present', res.headers.get('Access-Control-Allow-Origin') === '*',
  res.headers.get('Access-Control-Allow-Origin'));
check('response is JSON content-type', (res.headers.get('Content-Type') || '').includes('application/json'),
  res.headers.get('Content-Type'));

let pre = await worker.fetch(new Request('https://w.dev/', { method: 'OPTIONS' }), {});
check('OPTIONS preflight -> 204', pre.status === 204, pre.status);
check('preflight allows POST', (pre.headers.get('Access-Control-Allow-Methods') || '').includes('POST'));
check('preflight allows Content-Type header',
  (pre.headers.get('Access-Control-Allow-Headers') || '').includes('Content-Type'));

/* 3) سياق المحادثة ------------------------------------------------------ */
installFetch(geminiOk('ok'));
await worker.fetch(post({
  message: 'and his projects?',
  history: [
    { role: 'user', content: 'hello' },
    { role: 'assistant', content: 'hi there' }
  ]
}), { GEMINI_API_KEY: 'k' });

const roles = lastCall.body.contents.map((c) => c.role + ':' + c.parts[0].text);
check('history mapped to gemini roles',
  roles.join(' | ') === 'user:hello | model:hi there | user:and his projects?',
  roles.join(' | '));

/* 4) المفتاح الناقص ----------------------------------------------------- */
res = await worker.fetch(post({ message: 'hi' }), {});
data = await res.json();
check('missing key -> 502', res.status === 502, res.status);
check('missing key -> clear code', data.code === 'MISSING_API_KEY', JSON.stringify(data));

/* 5) مدخلات غلط --------------------------------------------------------- */
res = await worker.fetch(new Request('https://w.dev/', { method: 'GET' }), {});
check('GET -> 405', res.status === 405, res.status);

res = await worker.fetch(new Request('https://w.dev/', {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: 'not json{'
}), {});
check('bad JSON -> 400', res.status === 400, res.status);

res = await worker.fetch(post({ message: '   ' }), {});
check('blank message -> 400', res.status === 400, res.status);

res = await worker.fetch(post({ message: 'x'.repeat(1001) }), {});
check('too long -> 413', res.status === 413, res.status);

/* 6) أخطاء جوجل --------------------------------------------------------- */
installFetch(geminiError(400, 'API key not valid. Please pass a valid API key.'));
res = await worker.fetch(post({ message: 'hi' }), { GEMINI_API_KEY: 'bad' });
data = await res.json();
check('bad key -> 502', res.status === 502, res.status);
check('bad key -> config-related message',
  data.error.includes('not configured') || data.error.includes('unavailable'), JSON.stringify(data));

installFetch(geminiError(429, 'Quota exceeded'));
res = await worker.fetch(post({ message: 'hi' }), { GEMINI_API_KEY: 'k' });
data = await res.json();
check('rate limit -> friendly message', data.error.includes('Too many requests'), JSON.stringify(data));

installFetch(geminiError(404, 'models/gemini-9 does not exist'));
res = await worker.fetch(post({ message: 'hi' }), { GEMINI_API_KEY: 'k' });
check('unknown model -> 502', res.status === 502, res.status);

/* 7) الفلتر الأمني ------------------------------------------------------ */
installFetch(geminiSafety());
res = await worker.fetch(post({ message: 'hi' }), { GEMINI_API_KEY: 'k' });
data = await res.json();
check('safety block -> 502', res.status === 502, res.status);
check('safety block -> EMPTY_RESPONSE code', data.code === 'EMPTY_RESPONSE', JSON.stringify(data));

/* 8) وضع التشخيص -------------------------------------------------------- */
installFetch(geminiError(400, 'API key not valid'));
res = await worker.fetch(post({ message: 'hi' }, 'https://w.dev/?debug=1'), { GEMINI_API_KEY: 'badkey' });
data = await res.json();
check('debug exposes real error', String(data.error).includes('DEBUG:'), JSON.stringify(data));
check('debug reports key presence + length', data.hasKey === true && data.keyLength === 6, JSON.stringify(data));
check('debug does NOT leak the key value', !JSON.stringify(data).includes('badkey'));

/* 9) تقليم التاريخ ------------------------------------------------------ */
installFetch(geminiOk('ok'));
const longHistory = [];
for (let i = 0; i < 40; i++) {
  longHistory.push({ role: i % 2 ? 'assistant' : 'user', content: 'msg' + i });
}
await worker.fetch(post({ message: 'last', history: longHistory }), { GEMINI_API_KEY: 'k' });
check('history trimmed to 7 msgs (6 + current)', lastCall.body.contents.length === 7, lastCall.body.contents.length);

console.log(results.join('\n'));
const failed = results.filter((r) => r.startsWith('FAIL'));
console.log('\n' + (results.length - failed.length) + '/' + results.length + ' passed');
process.exit(failed.length ? 1 : 0);

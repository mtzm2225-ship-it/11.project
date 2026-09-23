export default async function run(page, ui) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:5056/index.html', { waitUntil: 'load' });
  await page.waitForFunction(() => !document.getElementById('name-intro'), { timeout: 20000 });
  await page.waitForTimeout(500);

  // wake the custom cursor
  await page.mouse.move(400, 300);
  await page.waitForTimeout(200);
  await page.mouse.move(500, 350);
  await page.waitForTimeout(400);

  // hover a real button and check the SYSTEM cursor is hidden everywhere
  const btn = await page.$('.btn-primary');
  const box = await btn.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.waitForTimeout(400);

  const onButton = await page.evaluate(() => {
    const el = document.elementFromPoint(
      ...(() => {
        const b = document.querySelector('.btn-primary').getBoundingClientRect();
        return [b.x + b.width / 2, b.y + b.height / 2];
      })()
    );
    // walk up and record every cursor value in the chain
    const chain = [];
    let n = el;
    while (n && n !== document.documentElement) {
      chain.push({ tag: n.tagName, cls: (n.className || '').toString().slice(0, 30), cursor: getComputedStyle(n).cursor });
      n = n.parentElement;
    }
    const hand = document.querySelector('.cursor-dot-hand');
    return {
      hoveredTag: el ? el.tagName : null,
      hoveringTarget: document.body.classList.contains('is-hovering-target'),
      handExists: !!hand,
      handOpacity: hand ? getComputedStyle(hand).opacity : null,
      cursorChain: chain.slice(0, 5),
    };
  });

  // also check a nav link, a slider arrow, and a lang button
  const probes = [];
  for (const sel of ['.nav-links a', '.slider-btn', '.lang-btn', '.social-link', '.btn-submit']) {
    const h = await page.$(sel);
    if (!h) continue;
    const b = await h.boundingBox();
    if (!b) continue;
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
    await page.waitForTimeout(220);
    const cur = await page.evaluate((s) => {
      const el = document.querySelector(s);
      return el ? getComputedStyle(el).cursor : 'missing';
    }, sel);
    probes.push({ sel, cursor: cur });
  }

  // inputs must still show the text cursor
  await page.mouse.move(600, 600);
  const inputCursor = await page.evaluate(() =>
    getComputedStyle(document.querySelector('#search-input')).cursor
  );

  return { onButton, probes, inputCursor };
}

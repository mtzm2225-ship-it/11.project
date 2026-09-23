export default async function run(page, ui) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:5056/index.html', { waitUntil: 'load' });
  await page.waitForFunction(() => !document.getElementById('name-intro'), { timeout: 20000 });
  await page.waitForTimeout(500);

  await page.mouse.move(400, 300);
  await page.waitForTimeout(300);
  await page.mouse.move(450, 330);
  await page.waitForTimeout(400);

  // Are the classes actually on <body>?
  const cls = await page.evaluate(() => ({
    hasCustomCursor: document.body.classList.contains('has-custom-cursor'),
    isPointerLive: document.body.classList.contains('is-pointer-live'),
  }));

  // force the class and re-measure to isolate CSS vs JS
  const forced = await page.evaluate(() => {
    document.body.classList.add('has-custom-cursor');
    const out = {};
    ['.slider-btn', '.social-link', '.btn-submit', '.nav-links a', '.btn-primary'].forEach((s) => {
      const el = document.querySelector(s);
      if (!el) return;
      const cs = getComputedStyle(el);
      out[s] = { cursor: cs.cursor, importantChecked: cs.getPropertyPriority('cursor') };
    });
    return out;
  });

  return { cls, forced };
}

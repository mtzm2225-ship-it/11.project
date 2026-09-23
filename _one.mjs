export default async function run(page, ui) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:5056/index.html', { waitUntil: 'load' });
  await page.waitForFunction(() => !document.getElementById('name-intro'), { timeout: 20000 });
  await page.waitForTimeout(500);

  // wake the custom cursor
  await page.mouse.move(500, 400);
  await page.waitForTimeout(300);

  const read = () =>
    page.evaluate(() => {
      const cs = (sel) => {
        const el = document.querySelector(sel);
        return el ? getComputedStyle(el).opacity : 'missing';
      };
      return {
        arrow: cs('.cursor-dot-arrow'),
        hand: cs('.cursor-dot-hand'),
        dot: cs('.cursor-dot'),
        ring: cs('.cursor-ring'),
        isTyping: document.body.classList.contains('is-typing'),
        isHovering: document.body.classList.contains('is-hovering-target'),
        // how many custom visuals are actually visible?
        visibleCustom: [cs('.cursor-dot'), cs('.cursor-ring')].filter(
          (o) => parseFloat(o) > 0.1
        ).length,
      };
    });

  // 1) empty space
  await page.mouse.move(300, 800);
  await page.waitForTimeout(400);
  const empty = await read();

  // 2) on a button -> hand replaces arrow; ring still ok
  const btn = await page.$('.btn-primary');
  const b = await btn.boundingBox();
  await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
  await page.waitForTimeout(500);
  const onButton = await read();
  const buttonCursor = await page.evaluate(() => {
    const el = document.querySelector('.btn-primary');
    return getComputedStyle(el).cursor;
  });

  // 3) on the search input -> everything custom must hide
  const input = await page.$('#search-input');
  const ib = await input.boundingBox();
  await page.mouse.move(ib.x + ib.width / 2, ib.y + ib.height / 2);
  await page.waitForTimeout(500);
  const onInput = await read();
  const inputCursor = await page.evaluate(() =>
    getComputedStyle(document.querySelector('#search-input')).cursor
  );

  // 4) on the contact textarea
  const ta = await page.$('#message');
  if (ta) {
    await ta.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const tb = await ta.boundingBox();
    await page.mouse.move(tb.x + tb.width / 2, tb.y + tb.height / 2);
    await page.waitForTimeout(500);
  }
  const onTextarea = await read();
  const taCursor = await page.evaluate(() => {
    const el = document.querySelector('#message');
    return el ? getComputedStyle(el).cursor : 'missing';
  });

  return { empty, onButton, buttonCursor, onInput, inputCursor, onTextarea, taCursor };
}

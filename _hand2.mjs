export default async function run(page, ui) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:5056/index.html', { waitUntil: 'load' });
  await page.waitForFunction(() => !document.getElementById('name-intro'), { timeout: 20000 });
  await page.waitForTimeout(500);

  // wake the custom cursor with a real move
  await page.mouse.move(500, 400);
  await page.waitForTimeout(300);

  // hover the CTA button -> hand should appear AND system cursor must be none
  const btn = await page.$('.btn-primary');
  const b = await btn.boundingBox();
  const cx = b.x + b.width / 2;
  const cy = b.y + b.height / 2;
  await page.mouse.move(cx, cy);
  await page.waitForTimeout(500);

  const onButton = await page.evaluate(({ x, y }) => {
    const top = document.elementFromPoint(x, y);
    const hand = document.querySelector('.cursor-dot-hand');
    const arrow = document.querySelector('.cursor-dot-arrow');
    const chain = [];
    let n = top;
    while (n && n !== document.documentElement) {
      chain.push({ tag: n.tagName, cls: (n.className || '').toString().slice(0, 26), cursor: getComputedStyle(n).cursor });
      n = n.parentElement;
    }
    return {
      topElement: top ? top.tagName + '.' + (top.className || '').toString().slice(0, 24) : null,
      hoveringTarget: document.body.classList.contains('is-hovering-target'),
      handOpacity: hand ? getComputedStyle(hand).opacity : 'no hand element',
      handTransform: hand ? getComputedStyle(hand).transform.slice(0, 50) : null,
      arrowPresent: !!arrow,
      anyPointerInChain: chain.some((c) => c.cursor === 'pointer'),
      chain: chain.slice(0, 4),
    };
  }, { x: cx, y: cy });

  // move onto empty space -> hand must vanish
  await page.mouse.move(200, 700);
  await page.waitForTimeout(500);
  const offTarget = await page.evaluate(() => {
    const hand = document.querySelector('.cursor-dot-hand');
    return {
      hoveringTarget: document.body.classList.contains('is-hovering-target'),
      handOpacity: hand ? getComputedStyle(hand).opacity : 'no hand element',
    };
  });

  // input must still give the text cursor
  const inp = await page.evaluate(() => getComputedStyle(document.querySelector('#search-input')).cursor);

  return { onButton, offTarget, inputCursor: inp };
}

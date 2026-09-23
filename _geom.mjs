export default async function run(page, ui) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:5056/index.html', { waitUntil: 'load' });
  await page.waitForFunction(() => !document.getElementById('name-intro'), { timeout: 20000 });
  await page.waitForTimeout(500);

  await page.mouse.move(500, 400);
  await page.waitForTimeout(300);

  const btn = await page.$('.btn-primary');
  const b = await btn.boundingBox();
  await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
  await page.waitForTimeout(600);

  return await page.evaluate(() => {
    const dot = document.querySelector('.cursor-dot').getBoundingClientRect();
    const arrow = document.querySelector('.cursor-dot-arrow').getBoundingClientRect();
    const hand = document.querySelector('.cursor-dot-hand').getBoundingClientRect();
    return {
      pointerAnchor: { x: Math.round(dot.left), y: Math.round(dot.top) },
      arrow: { x: Math.round(arrow.left), y: Math.round(arrow.top), w: Math.round(arrow.width), h: Math.round(arrow.height) },
      hand: { x: Math.round(hand.left), y: Math.round(hand.top), w: Math.round(hand.width), h: Math.round(hand.height) },
      handOffsetFromAnchorX: Math.round(hand.left - dot.left),
      handOffsetFromAnchorY: Math.round(hand.top - dot.top),
      overlap: !(hand.left >= arrow.right || hand.right <= arrow.left || hand.top >= arrow.bottom || hand.bottom <= arrow.top),
    };
  });
}

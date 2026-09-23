export default async function run(page, ui) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:5056/index.html', { waitUntil: 'load' });
  await page.waitForFunction(() => !document.getElementById('name-intro'), { timeout: 20000 });
  await page.waitForTimeout(500);

  // big so I can actually judge the shapes
  await page.addStyleTag({
    content:
      '.cursor-dot-arrow{width:60px!important;height:60px!important;}' +
      '.cursor-dot-hand{width:60px!important;height:60px!important;}',
  });

  await page.mouse.move(500, 400);
  await page.waitForTimeout(300);

  const btn = await page.$('.btn-primary');
  const b = await btn.boundingBox();
  await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
  await page.waitForTimeout(700);

  return await page.evaluate(() => ({
    hovering: document.body.classList.contains('is-hovering-target'),
    arrowOp: getComputedStyle(document.querySelector('.cursor-dot-arrow')).opacity,
    handOp: getComputedStyle(document.querySelector('.cursor-dot-hand')).opacity,
  }));
}

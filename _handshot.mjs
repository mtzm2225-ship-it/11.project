export default async function run(page, ui) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:5056/index.html', { waitUntil: 'load' });
  await page.waitForFunction(() => !document.getElementById('name-intro'), { timeout: 20000 });
  await page.waitForTimeout(500);

  // blow the cursor up so its shape is clearly readable in the shot
  await page.addStyleTag({
    content:
      '.cursor-dot-arrow{width:80px!important;height:80px!important;}' +
      '.cursor-dot-hand{width:52px!important;height:52px!important;top:52px!important;left:52px!important;}',
  });

  await page.mouse.move(500, 400);
  await page.waitForTimeout(300);

  const btn = await page.$('.btn-primary');
  const b = await btn.boundingBox();
  await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
  await page.waitForTimeout(700);

  return await page.evaluate(() => ({
    hovering: document.body.classList.contains('is-hovering-target'),
    hand: getComputedStyle(document.querySelector('.cursor-dot-hand')).opacity,
  }));
}

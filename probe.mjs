export default async function run(page, ui) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:8899/index.html', { waitUntil: 'load' });
  await page.waitForTimeout(2500);
  const r = await page.evaluate(() => {
    const txt = document.querySelector('.hero-text-content').getBoundingClientRect();
    const img = document.querySelector('.hero-image-wrapper').getBoundingClientRect();
    const row = document.querySelector('.hero-top-row').getBoundingClientRect();
    return {
      row: { l: Math.round(row.left), r: Math.round(row.right), cx: Math.round((row.left+row.right)/2) },
      txt: { l: Math.round(txt.left), r: Math.round(txt.right), t: Math.round(txt.top), b: Math.round(txt.bottom), w: Math.round(txt.width) },
      img: { l: Math.round(img.left), r: Math.round(img.right), t: Math.round(img.top), b: Math.round(img.bottom), w: Math.round(img.width) },
      pageCenter: window.innerWidth/2,
      overlapX: !(img.left >= txt.right),
      sameRow: Math.abs(txt.top - img.top) < 100
    };
  });
  await page.screenshot({ path: 'd1.png' });
  return r;
}

export default async function run(page) {
  // جلسة/بروفايل جديد = تابة جديدة = sessionStorage فاضي = زيارة جديدة
  await page.waitForTimeout(3500);
  const afterIntro = await page.evaluate(() => {
    const i = document.getElementById("name-intro");
    return {
      exists: !!i,
      hidden: i ? i.classList.contains("is-hidden") : null,
      ready: i ? i.getAttribute("aria-hidden") === "false" : null,
      hasText: i ? !!i.querySelector(".name-intro-text") : false,
    };
  });
  return { newTab_intro: afterIntro };
}

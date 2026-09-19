/* QA للإجابة: هل المساعد بيرد فعلًا؟ */
export default async function run(page, ui) {
  const out = {};

  const before = await ui.snapshot();
  out.initialResponse = await page.locator('#aiResponse').innerText();

  // 1) سؤال فاضي — لازم يظهر تنبيه
  await ui.click('@' + before.match(/@(e\d+) button "Send question"/)[1]);
  await page.waitForTimeout(300);
  out.emptyQuestion = await page.locator('#aiResponse').innerText();

  // 2) سؤال حقي عن طريق الكتابة + Enter
  await ui.fill('@' + before.match(/@(e\d+) textbox "Ask the AI assistant/)[1], 'What skills does Moataz have?');
  await page.locator('#userInput').press('Enter');
  await page.waitForTimeout(400);
  out.thinkingState = await page.locator('#aiResponse').innerText();
  out.buttonDisabledWhileBusy = await page.locator('#aiSendButton').isDisabled();

  // نستنى الرد النهائي (نجاح أو خطأ)
  await page.waitForFunction(
    () => {
      const t = document.getElementById('aiResponse').innerText;
      return t && t !== 'Thinking...' && t !== '...جاري التفكير';
    },
    { timeout: 45000 }
  ).catch(() => {});

  out.finalResponse = await page.locator('#aiResponse').innerText();
  out.isErrorState = await page.locator('#aiResponse').evaluate((el) => el.classList.contains('is-error'));
  out.inputCleared = (await page.locator('#userInput').inputValue()) === '';
  out.buttonReEnabled = !(await page.locator('#aiSendButton').isDisabled());

  return out;
}

const {test,expect}= require('@playwright/test');


test("Handling hidden elements ", async ({page})=>{

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");



expect(await page.locator("#displayed-text")).toBeVisible();

await page.locator("#hide-textbox").click();


expect(await page.locator("#displayed-text")).toBeHidden();

await page.locator("#show-textbox").click();

await page.pause();

await page.waitForTimeout(3000);

await expect(await page.locator("#displayed-text")).toBeVisible();

})

test("Handling popups or dialogues ",async ({page})=>
{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");


 page.on("dialog",dialog => dialog.accept());

// await page.locator("#alertbtn").click();


await page.locator("#confirmbtn").click();

await page.pause();
})



test("handling frames ", async ({page}) =>
{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    const Frmae=await page.frameLocator("#courses-iframe");

   await expect(await Frmae.locator('[href*="subscription"]').first()).toBeVisible();

})
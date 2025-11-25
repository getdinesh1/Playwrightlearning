const { test, expect } = require('@playwright/test');

test("Browser context", async ({ browser }) => {
  const Context = await browser.newContext();

  const page = await Context.newPage();

  await page.goto('https://www.amazon.com');

  await expect(page).toHaveTitle('Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in');

})

test("Browser context ", async function ({ page }) {

  await page.goto('https://www.google.com');
  await expect(page).toHaveTitle('Google');

  await page.locator('[aria-label="Search"]').fill("amazon");



  await page.locator('[aria-label="Search"]').fill("amazon");

  await page.locator('[aria-label="Search"]').fill("amazon");

})



test("locators ", async function ({ page }) {

  await page.goto('https://rahulshettyacademy.com/locatorspractice/');


  await page.locator('#inputUsername').fill("Dinesh");



  await page.locator('[name="inputPassword"]').fill("amazon");

  await page.locator('[type="submit"]').click();

})

test("Login to rahul shetty page and check for the warning incorrect login and then login corrctly and  capture 1 st element iphone ", async ({ page }) => {

  const userName = page.locator("#username");

  const passWord = page.locator("#password");

  const signinBtn = page.locator("#signInBtn");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  await userName.fill("Dinesh");

  await passWord.fill("password");

  await signinBtn.click();

  await expect(page.locator("[style*='block']")).toContainText("Incorrect");

  await userName.fill("");

  await passWord.fill("");


  await userName.fill("rahulshettyacademy");

  await passWord.fill("learning");

  await signinBtn.click();

  await console.log(await page.locator('.card-body a').nth(0).textContent());


  await expect(page.locator(".card-body a").first()).toContainText("iphone");

  console.log(await page.locator(".card-body a").allTextContents());


})



test('Client login', async ({ browser }) => {

  const context = await browser.newContext();


  const Page = await context.newPage();

  await Page.goto("https://rahulshettyacademy.com/client/#/auth/login");


  await Page.locator("#userEmail").fill("getdinesh6@gmail.com");

  await Page.locator("#userPassword").fill("Dinesh123@");

  await Page.locator("#login").click();

  // await Page.waitForLoadState("networkidle");

  await Page.locator(".card-body h5 b").first().waitFor();

  console.log(await Page.locator(".card-body h5 b").allTextContents());
})


test('checkbox', async function ({ page }) {

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  await page.waitForLoadState("networkidle");

  await page.locator(".checkmark").nth(1).click();

  await page.locator("#okayBtn").click();

  await page.pause();

})



test('checkboxes and radio with assertions', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  await page.locator(".checkmark").last().click();

  await page.locator("#okayBtn").click();

  console.log(await page.locator(".checkmark").last().isChecked());

  expect(await page.locator(".checkmark").last().isChecked());

  await page.locator("#terms").click();

  await page.locator("#terms").isChecked();

  await page.locator("#terms").uncheck();

  console.log(page.locator("#terms").isChecked());

  expect(await page.locator("#terms").isChecked()).toBeFalsy();

})

test('Checking blinking test attibute presence', async ({ page }) => {

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const blinkLink = page.locator('[href*="documents-request"]');

  await expect(blinkLink).toHaveAttribute("class", "blinkingText");


})


test('child windows learning', async ({ browser }) => {

  const Context = await browser.newContext();


  const page = await Context.newPage();


  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  await page.waitForLoadState('networkidle');



  const [Page] = await Promise.all([Context.waitForEvent('page'), page.locator(".blinkingText").click(),]);


  await expect(Page.locator("[href*='mail']")).toContainText('rahul');


  const text = await Page.locator("[href*='mail']").textContent();


  const a = text.split("@");

  console.log(a);

  const b = a[1].split(" ");


  console.log(b);

})



test('Difference between Text content and Inut Value methods ', async ({ page }) => {

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  await page.waitForLoadState('networkidle');

  await page.locator('#username').fill("Dinesh");

  console.log('the content in th username field is ' + await page.locator('#username').textContent());


  console.log('the content in th username field is ' + await page.locator('#username').inputValue());



})


test('End to End flow', async ({ page }) => {


  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");


  await page.locator("#userEmail").fill("getdinesh6@gmail.com");

  await page.locator("#userPassword").fill("Dinesh123@");

  await page.locator("#login").click();

  await page.waitForLoadState("networkidle");

  await page.locator('.btn[style="float: right;"]').first().click();

  await page.locator('[routerlink="/dashboard/cart"]').click();


  await page.waitForLoadState('networkidle');


  await page.locator('.btn-primary').nth(1).click();

  await page.locator('.input').nth(3).click();

  await page.locator('.input').nth(3).fill('123');


  await page.locator('.input').nth(4).fill('Dinesh');


  await page.locator('.input').nth(5).fill('rahulshettyacademy');


  await page.locator('[type="submit"]').click();


  await page.waitForLoadState('networkidle');
  await page.locator('[placeholder="Select Country"]').waitFor();
  await page.locator('[placeholder="Select Country"]').click();
  await page.locator('[placeholder="Select Country"]').waitFor();

  await page.locator('[placeholder="Select Country"]').fill("india");


  await page.locator('[placeholder="Select Country"]').fill("");

  await page.locator('[placeholder="Select Country"]').fill("india");

  await page.locator('[class="ta-item list-group-item ng-star-inserted"]').nth(1).click();



  await page.locator('[class="btnn action__submit"]').click();


  const order = await page.locator('.ng-star-inserted').textContent();

  await page.locator('[routerlink="/dashboard/myorders"]').click();


})


test.only('Dynamically find the products to buy from the list of products and navigate to add to cart and submit order and catch the order id and search in orders', async ({ page }) => {

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  await page.locator("#userEmail").fill("getdinesh6@gmail.com");

  await page.locator("#userPassword").fill("Dinesh123@");

  await page.locator("#login").click();

  await page.waitForLoadState("networkidle");

  await page.locator(".card-body").first().waitFor();


  const productsList = await page.locator(".card-body");

  const count = await productsList.count();


  for (let i = 0; i < count; i++) {

    let procudtName = await productsList.nth(i).locator("b").textContent();

    if (procudtName === "ZARA COAT 3") {
      await productsList.nth(i).locator("text=Add To Cart").click();

      break;

    }
  }


  await page.locator("[routerlink*='cart']").click();

  await page.locator("div li").last().waitFor();

  expect(await page.locator("h3:has-text('ZARA COAT 3')").isVisible()).toBeTruthy();


  await page.locator("[type='button']").nth(1).click();


  await page.locator('.input').nth(3).click();

  await page.locator('.input').nth(3).fill('123');


  await page.locator('.input').nth(4).fill('Dinesh');


  await page.locator('.input').nth(5).fill('rahulshettyacademy');


  await page.locator('[type="submit"]').click();

  await page.locator("[placeholder='Select Country']").pressSequentially("indi");

  await page.locator(".ta-results").waitFor();

  const dropdown = await page.locator(".ta-results");

  const dpcount = await dropdown.locator("button").count();

  for (let i = 0; i < dpcount; i++) {

    console.log(await dropdown.locator("span").nth(i).textContent());

    if (await dropdown.locator("span").nth(i).textContent() === " India") {

      await dropdown.locator("button").nth(i).click();

      break;

    }
  }


  const email = page.locator(".user__name [type='text']").first();
  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderId);

  await page.locator('[routerlink*="order"]').first().click();

  const row = await page.locator("table tr");

  await page.locator("table").waitFor();

  for (let i = 1; i < await row.count(); i++) {

    const rowOrderId = await row.nth(i).locator('[scope="row"]').textContent();

    console.log(rowOrderId);

    if (await orderId.includes(rowOrderId)) {

      console.log('found' + rowOrderId);
      await row.nth(i).locator('button').first().click();

      break;
    }

  }

  await page.locator('text=Thank you for Shopping With Us').waitFor();

  console.log(orderId);


  console.log('the final'+await page.locator('.col-text').first().textContent());





   expect(await orderId.includes(await page.locator('.col-text').first().textContent())).toBeTruthy();

   


   console.log('test passed buddy')


})


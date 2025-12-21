const { test, expect } = require('@playwright/test');
const { stringify } = require('querystring');
const { rootCertificates } = require('tls');


const payload= {
    data: [],
    message: "No Orders"
};


test('Inject into Browser Context session storage', async ({browser}) => {


    // const context = await browser.newContext();

    // const page = await context.newPage();

    // await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    // await page.locator("#userEmail").fill("getdinesh6@gmail.com");

    // await page.locator("#userPassword").fill("Dinesh123@");

    // await page.locator("#login").click();

    // await page.waitForLoadState("networkidle");

    // await context.storageState({path : 'state.json'});

  const context = await  browser.newContext({storageState : 'state.json'});
  
  const page = await context.newPage();
  
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
   async route =>
    {

    const response=  await page.request.fetch(route.request());

  let body= JSON.stringify(payload);

   route.fulfill(
    {response,
      body,
    }
  )

    }
  );

  await page.locator('[routerlink*="order"]').first().click();

  


  await page.pause();
  



})

test('@QW Security test request intercept', async ({ page }) => {
 
    //login and reach orders page
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
 
    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

})


test.only('Inject into Browser Context abort route ', async ({browser}) => {


    // const context = await browser.newContext();

    // const page = await context.newPage();

    // await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    // await page.locator("#userEmail").fill("getdinesh6@gmail.com");

    // await page.locator("#userPassword").fill("Dinesh123@");

    // await page.locator("#login").click();

    // await page.waitForLoadState("networkidle");

    // await context.storageState({path : 'state.json'});

  const context = await  browser.newContext({storageState : 'state.json'});
  
  const page = await context.newPage();
  // await page.route('**/*.css',route => route.abort());

     await page.on('request',request => console.log(request.url()));
         await page.on('response',response => console.log(response.status()));
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

 


  await page.waitForLoadState('networkidle');


  await page.pause();
  



})
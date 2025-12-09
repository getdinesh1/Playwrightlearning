const {test,expect,request}= require('@playwright/test');
const {ApiUtils}= require('./utils/ApiUtils');

const payload= {
    userEmail: "getdinesh6@gmail.com",
    userPassword: "Dinesh123@"
};

const orderPayload ={
    orders: [
        {
            country: "India",
            productOrderedId: "68a961459320a140fe1ca57a"
        }
    ]
};

let orderId;
let token;

test.beforeAll(async() =>
{

    const ApiContext= await request.newContext();

    const apiUtils = new ApiUtils(ApiContext,payload);
    
    token= await apiUtils.getToken();
    console.log('token extracted'+token);

    // Step 2: Create order
 
    orderId = await apiUtils.getOrderId(orderPayload);
    console.log("Order ID extracted:", orderId);

})


test.only("client login via api req token",async ({page})=>
{

    console.log(token);
   await page.addInitScript(value =>
    {
        window.localStorage.setItem("token",value);

    },token
    );

    await page.goto("https://rahulshettyacademy.com/client");
 await page.waitForTimeout(6000);


  await page.locator('[routerlink*="order"]').first().click();

//   await page.pause();

  const row = await page.locator("table tr");

  await page.getByRole("table").waitFor();

  await page.locator("tr").filter({hasText:orderId}).getByRole("button",{name:"View"}).click();


  await page.getByText('Thank you for Shopping With Us').waitFor();

  console.log('order id is'+orderId);


  console.log('the final' + await page.locator('.col-text').first().textContent());


  expect(await orderId.includes(await page.locator('.col-text').first().textContent())).toBeTruthy();


  console.log('test passed buddy');


})
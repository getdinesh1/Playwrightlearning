const {test,expect,request}= require('@playwright/test');

const payload= {
    userEmail: "getdinesh6@gmail.com",
    userPassword: "Dinesh123@"
};
let token;
test.beforeAll(async() =>
{

    const ApiContext= await request.newContext();

   const response=await ApiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: payload
        });

      expect(response.ok()).toBeTruthy();

     const json= await response.json();

      token=json.token;


})


test("client login via api req token",async ({page})=>
{

    console.log(token);
   await page.addInitScript(value =>
    {
        window.localStorage.setItem("token",value);

    },token
    );

    await page.goto("https://rahulshettyacademy.com/client");
 await page.waitForTimeout(6000);

})
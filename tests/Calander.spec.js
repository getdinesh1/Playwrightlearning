const {test,expect}= require("@playwright/test");





test.only("Calander selection", async ({page}) =>
{

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    const month= "4";

    const year = "2024";

    const date= "12";

    const Expected=[month,date,year];

    
   await  page.locator(".react-date-picker__inputGroup").click();

   await  page.locator(".react-calendar__navigation__label").click();

   await page.locator(".react-calendar__navigation__label").click();


    await page.getByText(year).click();



    await page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click();


    await page.locator(".react-calendar__month-view__days__day").filter({hasText:date}).click();

    const List=await page.locator(".react-date-picker__inputGroup__input");


    for(let i=0; i<Expected.length;i++)
    {

       const val=await  List.nth(i).inputValue();


       await console.log(val);
       

       await expect(val).toEqual(Expected[i])

    }


})
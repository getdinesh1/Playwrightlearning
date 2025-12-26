const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageobjects/POManager');
// Load test data sets from external JSON, stringify and parse
const testDataSets = JSON.parse(JSON.stringify(require('./testDataSets.json')));

// Use normal for loop for parameterization
for (let index = 0; index < testDataSets.length; index++) {
  const data = testDataSets[index];
  test(`Client App login parameterized test ${index + 1}`, async ({page}) => {
    const poManager = new POManager(page);
    const username = data.username;
    const password = data.password;
    const productName = data.productName;
    const products = page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username,password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
  });
}
const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageobjects/POManager');
// Import JSON, convert to stringify then to object
const testData = JSON.parse(JSON.stringify(require('./testData.json')));

test('Client App login with data from JSON', async ({page})=>
{
  // Test data loaded and processed from JSON file

  const poManager = new POManager(page);
  const username = testData.username;
  const password = testData.password;
  const productName = testData.productName;
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
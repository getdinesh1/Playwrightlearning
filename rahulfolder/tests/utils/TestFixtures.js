const {test} = require('@playwright/test');

// Extend the test to include a custom fixture for test data
const customTest = test.extend({
  testData: async ({}, use) => {
    // Define test data in the fixture
    const data = {
      username: "anshika@gmail.com",
      password: "Iamking@000",
      productName: 'Zara Coat 4'
    };
    await use(data);
  }
});

module.exports = { customTest };
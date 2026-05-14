const { When, Then, Given } = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager');
const { expect } = require('@playwright/test'); //test annotatiin is not required in cucumber framework. It is used in mocha framework.
const { playwright } = require('@playwright/test');
const { chromium } = require('playwright');
//const { setDefaultTimeout } = require('@cucumber/cucumber');
//setDefaultTimeout(60 * 1000); // 60 seconds

//write step definitions here. To get the skeleton of steps, at first run the command npx cucumber-js
Given('login to Ecommerce application with {string} and {string}', { timeout: 60 * 1000 }, async function (useremail, password) {
    // Write code here that turns the phrase above into concrete actions

    //this.browser = await chromium.launch();
    //this.browser = await playwright.chromium.launch(); //to get browser object
    /*const context = await this.browser.newContext(); //to activate the life of page and browser fixtures
    const page = await context.newPage();
    this.poManager = new POManager(page);*/ //all these browser related steps are added inside hooks.js (before method)
    const products = this.page.locator(".card-body"); //const products= page.locator(".card-body"); (before adding world constructor)
    const loginPage = this.poManager.getLoginPage(); //class object creation
    await loginPage.goTo();
    await loginPage.validLogin(useremail, password);
});

When('Add {string} to Cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the Cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    const cartCheckoutPage = this.poManager.getCartCheckoutPage();
    await cartCheckoutPage.verifyProductIsDisplayed(productName);
    await cartCheckoutPage.Checkout();
});

When('Enter valid details and place the order', async function () {
    // Write code here that turns the phrase above into concrete actions
    const ordersReviewPage = this.poManager.getOrderReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPage.submitAndGetOrderId();
    console.log(orderId);
});

Then('Verify order is present in the OrderHistory', async function () {
    // Write code here that turns the phrase above into concrete actions
    this.dashboardPage.navigateToOrders();
    const orderHistoryPage = this.poManager.getOrderHistoryPage();
    await orderHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
});

Given('login to Ecommerce2 application with {string} and {string}', async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    const userName = this.page.locator('#username');
    const signIn = this.page.locator("#signInBtn");
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    await userName.fill(username);
    await this.page.locator("[type ='password']").fill(password);
    await signIn.click();
});

Then('Verify error message is displayed', async function () {
    // Write code here that turns the phrase above into concrete actions
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
});

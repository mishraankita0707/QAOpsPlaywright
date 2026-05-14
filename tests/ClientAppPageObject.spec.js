const { test, expect } = require('@playwright/test');
const { customtest } = require('../utils/test-base');

const { POManager } = require('../pageobjects/POManager');
// const {LoginPage} = require('../pageobjects/LoginPage'); *** write POManager in place of all the page objects
// const {DashboardPage} = require('../pageobjects/DashboardPage');
// const {CartCheckoutPage} = require('../pageobjects/CartCheckoutPage');
// const {OrdersReviewPage} = require('../pageobjects/OrdersReviewPage');
// const { OrdersHistoryPage } = require('../pageobjects/OrdersHistoryPage');
//JSON---> String(using JSON.strigify())----> JS object (using JSON.parse())
const dataset = JSON.parse(JSON.stringify(require("../utils/clientAppPageObjectTestData.json"))); //JSON.parse() coverts a JSOn into a JS object

for (const data of dataset) {
    test(`@Web Client App Login for ${data.productName}`, async ({ page }) =>  //${data.productName} is used to understand which product is being picked for test. Product name can now be dynamically written
    {

        const poManager = new POManager(page);
        //const productName= "ZARA COAT 3"; //comes from JSON file(utils) now
        const products = page.locator(".card-body");
        const dateDropdown = page.locator(".input");
        // const useremail= "mishraankita0794@gmail.com"; //comes from JSON file(utils) now
        // const password = "Password@7"; //comes from JSON file(utils) now
        const loginPage = poManager.getLoginPage(); //class object creation
        await loginPage.goTo();
        await loginPage.validLogin(data.useremail, data.password); //now replace dataset with data (to iterate the test with different datasets)
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(data.productName);
        await dashboardPage.navigateToCart();


        //await page.waitForLoadState('networkidle');   //Incase if this code does not work, try the alternative in the next line
        //await page.locator(".card-body b").first().waitFor();

        const cartCheckoutPage = poManager.getCartCheckoutPage();
        await cartCheckoutPage.verifyProductIsDisplayed(data.productName);
        await cartCheckoutPage.Checkout();

        //Enter card details
        await page.locator(".form__cc [type='text']").first().fill("4542 9931 9292 2293");
        await dateDropdown.nth(1).selectOption("04");
        await dateDropdown.nth(2).selectOption("26");
        await page.locator("[type='text']").nth(1).fill("123");
        await page.locator("[type='text']").nth(2).fill("Rahul Shetty");
        await page.locator("[type='text']").nth(3).fill("rahulshettyacademy");
        await page.locator(".btn-primary").click();
        await page.locator("[style='color: green;']").waitFor();
        await expect(page.locator(".user__name [type='text']").first()).toHaveText(data.useremail);

        const ordersReviewPage = poManager.getOrderReviewPage();
        await ordersReviewPage.searchCountryAndSelect("ind", "India");
        const orderId = await ordersReviewPage.submitAndGetOrderId();
        console.log(orderId);
        await dashboardPage.navigateToOrders();
        const orderHistoryPage = poManager.getOrderHistoryPage();
        await orderHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();

        //view order 
        // await page.locator("button[routerlink*='myorders']").click();

        //const rows= await page.locator("tbody tr");
        // const orderCount= await rows.count();
        // for(let i=0; i<orderCount; i++)
        // {
        //     const rowOrderId= await rows.nth(i).locator("th").textContent();
        //     if(orderId.includes(rowOrderId))
        //     {
        //         await rows.nth(i).locator("button").first().click();
        //         break;
        //     }
        // }
        // const orderIdDetails= await page.locator(".col-text").textContent();
        // expect(orderId.includes(orderIdDetails)).toBeTruthy();

    });

    customtest('Client App Login- valid user', async ({ page, testDataForOrder }) =>  //${data.productName} is used to understand which product is being picked for test. Product name can now be dynamically written
    {
        //testDataForOrder is created as a fixture inside test-base.js file
        const poManager = new POManager(page);
        //const productName= "ZARA COAT 3"; //comes from JSON file(utils) now
        const products = page.locator(".card-body");
        const dateDropdown = page.locator(".input");
        // const useremail= "mishraankita0794@gmail.com"; //comes from JSON file(utils) now
        // const password = "Password@7"; //comes from JSON file(utils) now
        const loginPage = poManager.getLoginPage(); //class object creation
        await loginPage.goTo();
        await loginPage.validLogin(testDataForOrder.useremail, testDataForOrder.password); //now replace dataset with data (to iterate the test with different datasets)
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(testDataForOrder.productName);
        await dashboardPage.navigateToCart();


        //await page.waitForLoadState('networkidle');   //Incase if this code does not work, try the alternative in the next line
        //await page.locator(".card-body b").first().waitFor();

        const cartCheckoutPage = poManager.getCartCheckoutPage();
        await cartCheckoutPage.verifyProductIsDisplayed(testDataForOrder.productName);
        await cartCheckoutPage.Checkout();

        const ordersReviewPage = poManager.getOrderReviewPage();
        await ordersReviewPage.searchCountryAndSelect("ind", "India");
        const orderId = await ordersReviewPage.submitAndGetOrderId();
        console.log(orderId);
        await dashboardPage.navigateToOrders();
        const orderHistoryPage = poManager.getOrderHistoryPage();
        await orderHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
    });
}

//add page objects for cart page,checkout, order pages

//Parallel execution: test files will trigger parallely
//individual tests will run sequentially
//by default plaqywright can run tests parallely
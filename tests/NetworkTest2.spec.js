const {test, expect} = require("@playwright/test");

//To check for a wrong order Id (which does not belong to this account)

test('Security test request call intercept', async({page})=>
{
    //login and reach the orders page
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("mishraankita0794@gmail.com");
    await page.locator("#userPassword").fill("Password@7");
    await page.locator("[name='login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/id=*",
    route=> route.continue({url : 'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/id=72tfh8h98h1fd6576g7ddst6'}));
    //continue({header,url...}) is used to intercept request calls
    await page.locator("button:has-text('View')").first().click();
    //await page.pause();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
})
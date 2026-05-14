const {test, expect} = require('@playwright/test');

test('Webst Client App Login', async({page})=>
{

    const productName= "ZARA COAT 3";
    const products= page.locator(".card-body");
    const dateDropdown= page.locator(".input");
    const email= "mishraankita0794@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Password@7");
    await page.getByRole('button', {name:'Login'}).click;
    await page.waitForLoadState('networkidle');
    //await page.locator(".card-body b").first().waitFor();
    
    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole('button', {name: 'Add To Cart'}).click();

    await page.getByRole("listitem").getByRole('button', {name:'Cart'}).click;

    await page.locator("div li").first().waitFor(); //waitFor() is used to wait until the item is shown up on the page. The test might fail if the required item is not rendered.
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();

    await page.getByRole("button", {name: 'checkout'}).click();
    
    await page.locator("[placeholder='Select Country']").pressSequentially("ind", {delay:100});
    
    await page.getByRole("button", {name: 'India'}).nth(1).click();

    await page.getByText("PLACE ORDER").click();

    await page.getByText("Thankyou for the order.").toBeVisible();
    
    /*const orderId= await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    //view order 
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows= await page.locator("tbody tr");
    const orderCount= await rows.count();
    for(let i=0; i<orderCount; i++)
    {
        const rowOrderId= await rows.nth(i).locator("th").textContent();
        if(orderId.includes(rowOrderId))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails= await page.locator(".col-text").textContent();
    expect(orderId.in*/

});
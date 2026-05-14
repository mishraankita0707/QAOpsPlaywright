const {test, expect} = require('@playwright/test');

test('Client App Login', async({page})=>
{

    const productName= "ZARA COAT 3";
    const products= page.locator(".card-body");
    const dateDropdown= page.locator(".input");
    const email= "mishraankita0794@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title());
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Password@7");
    await page.locator("[name='login']").click();

    //console.log(await page.locator(".card-body b").first().textContent());
    // Technique to wait dynamically for a new page
    //await page.waitForLoadState('networkidle');   Incase if this code does not work, try the alternative in the next line
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count= await products.count(); //count the number of elements present in this array
    for(let i=0; i<count; ++i)
    {
        if (await products.nth(i).locator("b").textContent()=== productName)
        {
            //Add to cart
            await products.nth(i).locator("text=  Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor(); //waitFor() is used to wait until the item is shown up on the page. The test might fail if the required item is not rendered.
    const boolean = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); // isVisible does not have auto-wait mechanism due to which waitFor() is used
    expect(boolean).toBeTruthy();

    //Handling dynamic dropdoowns (autosuggest dropdowns)
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder='Select Country']").pressSequentially("ind", {delay:100});
    const dropdown= page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount =await dropdown.locator("button").count();
    for(let i=0;i<optionsCount;i++)
    {
        const text= await dropdown.locator("button").nth(i).textContent();
        if(text=== " India")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    //Enter card details
    await page.locator(".form__cc [type='text']").first().fill("4542 9931 9292 2293");
    await dateDropdown.nth(1).selectOption("04");
    await dateDropdown.nth(2).selectOption("26");
    await page.locator("[type='text']").nth(1).fill("123");
    await page.locator("[type='text']").nth(2).fill("Rahul Shetty");
    await page.locator("[type='text']").nth(3).fill("rahulshettyacademy");
    await page.locator(".btn-primary").click();
    await page.locator("[style='color: green;']").waitFor();
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();

    //check for the thank you message and fetch the order ID
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId= await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
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
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

});
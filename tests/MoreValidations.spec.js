const {test,expect} = require('@playwright/test');

//test.describe.configure({mode : 'parallel'}); //to run tests parallely inside a single file
//test.describe.configure({mode : 'serial'}); //for running scripts serially that are interdependent. If one test fails, rest tests are skipped
test("Popup Validations", async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("http://google.com");
    await page.goBack(); //goes back to the previously opened page
    await page.goForward(); //goes to the next page
    await page.goBack();
    
    //Finding Hidden component
    await expect(page.locator("#displayed-text")).toBeVisible(); //to check if the component is visble
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden(); // to check if the components gets hidden

    //Java/JS Popups handling
    page.on('dialog', dialog => dialog.accept()); // to select OK button in the JS popup
    //page.on('dialog', dialog => dialog.dismiss()); //to select Cancel button in the JS popup
    await page.locator("#confirmbtn").click();

    //Handling Mouse Hover
    await page.locator("#mousehover").hover();

    //Handling frames:
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access'] : visible").click();
    const textCheck= await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);

});

test("Screenshot & Visual Comparison", async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: 'partialScreenshot.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshot.png'}); //takes screenshot of the entire webpage
    await expect(page.locator("#displayed-text")).toBeHidden();
});

//Visual testing
//Takes screenshot--> store--> again take screenshot and then compare with the first SS taken
//helps capture if there is any bug

test.only("Visual", async({page})=>
{
    await page.goto("https://google.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
});
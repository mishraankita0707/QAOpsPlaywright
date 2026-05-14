const {test, expect} = require('@playwright/test');
const { request } = require('http');


test('Browser context Login validation Playwright test', async ({browser})=>
{
   //chrome- plugins/ cookies
   const context = await browser.newContext();
   //newContext method helps in launching a fresh browser. Creates a new instance
   const page = await context.newPage();
   //page.route('**/*.css',route=> route.abort()); //to block a css network call
   //page.route('**/*.{jpg,png,jpeg}', route=>route.abort()); //to block the images network call
   //Playwright records all the request call made while loading a page. To capture the request calls we use the below code:
   page.on('request', request=> console.log(request.url())); //on() is a listener
   //to capture the response calls and the status code
   page.on('response', response=> console.log(response.url(), response.status()));
   //newPage method helps in opening a page by hitting the url
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   //goto method is used to enter the url. It takes string as an argument
   // test('First Playwright test', async ({browser,page})=>
   //page is another fixture in playwright which will directly call the newContext() and newPage() internally
   console.log(await page.title());
   await page.locator('#username').fill("ankita");
   await page.locator("[type ='password']").fill("Learning@830$3mK2");
   await page.locator("#signInBtn").click();
   console.log(await page.locator("[style*='block']").textContent());
   await expect(page.locator("[style*='block']")).toContainText('Incorrect');
   
   await page.locator('#username').fill("");
   await page.locator('#username').fill("rahulshettyacademy");
   await page.locator("#signInBtn").click();

   console.log(await page.locator(".card-body a").first().textContent());
   console.log(await page.locator(".card-body a").nth(1).textContent());
   const allTitles = await page.locator(".card-body a").allTextContents();
   console.log(allTitles);
});

test('Page Playwright test', async ({page})=>
{
    await page.goto("https://google.com");

    console.log(await page.title());  //get the title and add an assertion
    await expect(page).toHaveTitle("Google"); //To confirm if the title matched correctly

    //To locate--> Playwright supports css selectors to identify elements uniquely in the webpage
    
    // By default Playwright runs the tests in headless mode. we do nnot see the browser opening. 
    //Need to explicitly tell playwright to open in head mode
});

/*commands: 
1. npx playwright test  --> runs end to end tests
for multiple test files, tests will run parallely. If tests are present in the same file, then tests will run sequencially*/

// 2. To run tests in head mode use the command---> npx playwright test --headed
/*For running any particular test out of the lot, we can use test.only
Only that test case will run skipping other test*/


test('UI Controls', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator('#username').fill("rahulshettyacademy");
    await page.locator("[type ='password']").fill("Learning@830$3mK2");
    const documentLink= page.locator("[href*='documents-request']");
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("teach");
    //await page.pause();
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    //await page.pause();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    // assertions should be used to check whether the correct radio button is selected
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    //To check the checked assertion
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    //to check the uncheck assertions
    expect(await page.locator("#terms").isChecked()).toBeFalsy();     //wherever the action is performed, in that scope only await keyword should be used
    //to check the blinking text
    await expect(documentLink).toHaveAttribute("class", "blinkingText");
});

test('Child window handling', async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink= page.locator("[href*='documents-request']");
    
    const [newPage]= await Promise.all(
    [
      context.waitForEvent('page'), // listen for a new page. There are 3 states of Promises: Promise pending, Promise rejected, Promise fulfilled
      documentLink.click(), //new page is opened
    ]);
    
    const text= await newPage.locator(".red").textContent();
    console.log(text);
    const arrayText= text.split("@");
    const domain=arrayText[1].split(" ")[0];
    console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").textContent());

});


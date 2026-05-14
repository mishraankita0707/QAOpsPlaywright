import {test, expect} from '@playwright/test';

test('Playwright Special Locators', async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    //Use of getBy locators
    //getByLabel:
    await page.getByLabel("Check me out if you Love IceCreams!").check(); //can use click() as well
    await page.getByLabel("Employed").click();
    await page.getByLabel("Gender").selectOption("Female");
    //getByPlaceholder:
    await page.getByPlaceholder("Password").fill("password@123");
    //getByRole:
    await page.getByRole("button", {name: 'Submit'}).click();
    //getByText:
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link", {name:"Shop"}).click();

    //Advance code for selecting a product and adding to cart by using above methods in a single line
    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click(); //method chaining
    

});
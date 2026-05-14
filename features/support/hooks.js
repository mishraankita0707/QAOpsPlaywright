const { POManager } = require('../../pageobjects/POManager');
const { playwright } = require('@playwright/test');
const { chromium } = require('playwright');
const { Before, After, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber');

Before(async function () {
    this.browser = await chromium.launch();
    //this.browser = await playwright.chromium.launch(); //to get browser object
    const context = await this.browser.newContext(); //to activate the life of page and browser fixtures
    this.page = await context.newPage(); //const page = await context.newPage(); (before adding world constructor)
    this.poManager = new POManager(this.page); //this.poManager = new POManager(page); (before adding world constructor)
});

After(function () {
    console.log("I am the last one to execute");
});

BeforeStep(function () {
    // This hook will be executed before all steps in a scenario with tag @foo
});

AfterStep(async function ({ result }) {
    // This hook will be executed after all steps, and take a screenshot on step failure
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: "screenshot1.png" });
    }
});
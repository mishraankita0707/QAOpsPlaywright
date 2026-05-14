class LoginPage{

    constructor(page) //initialise the login related locators here
    {
        this.page= page;
        this.userEmail = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.signInButton = page.locator("[name='login']");
        this.page.waitForLoadState('networkidle');
        // this.page.locator(".card-body b").first().waitFor();
    }

    async goTo() //perform the action
    {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(useremail,password) //perform the login action here
    {
        await this.userEmail.fill(useremail);
        await this.password.fill(password);
        await this.signInButton.click();
    }
}
module.exports = {LoginPage};
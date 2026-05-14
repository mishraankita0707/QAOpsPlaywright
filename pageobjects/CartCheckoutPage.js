const {expect} = require("@playwright/test");

class CartCheckoutPage{

    constructor(page)
    {
        this.page= page;
        this.cartProducts = page.locator("div li").first();
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
        //this.getProductLocator = page.locator("h3:has-text('ZARA COAT 3')")
        this.checkout = page.locator("text=Checkout");
    }

async verifyProductIsDisplayed(productName)
{
    // await this.cartProducts.waitFor();
    // const boolean = await this.getProductLocator(productName).isVisible(); // isVisible does not have auto-wait mechanism due to which waitFor() is used
    // expect(boolean).toBeTruthy();

    await this.cartProducts.waitFor();
    const boolean = await this.getProductLocator(productName).isVisible();
    expect(boolean).toBeTruthy();
}

async Checkout()
{
    await this.checkout.click();
}

getProductLocator(productName)
{
    // return this.page.locator("h3:has-text('"+productName+"')");
    return this.page.locator(`h3:has-text("${productName}")`);
}

}
module.exports = {CartCheckoutPage};
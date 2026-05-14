class DashboardPage{

    constructor(page)
    {
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.myOrders = page.locator("button[routerlink*='myorders']");
        this.page = page;
    }

    async searchProductAddCart(productName)
    {
        const titles = await this.productsText.allTextContents();
        console.log("titles" + titles);
        const count= await this.products.count(); //count the number of elements present in this array
        for(let i=0; i<count; ++i)
        {
           if (await this.products.nth(i).locator("b").textContent()=== productName)
           {
              //Add to cart
              await this.products.nth(i).locator("button:has-text('Add To Cart')").click();
              break;
           }
        }
    }

    async navigateToCart()
    {
        await this.cart.click();
    }

    async navigateToOrders()
    {
        await this.myOrders.click();
    }


}
module.exports = {DashboardPage};
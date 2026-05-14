const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');
const {CartCheckoutPage} = require('./CartCheckoutPage');
const {OrdersReviewPage} = require('./OrdersReviewPage');
const {OrdersHistoryPage} = require('./OrdersHistoryPage');

class POManager
{
    constructor(page)
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage= new DashboardPage(this.page);
        this.cartCheckoutPage = new CartCheckoutPage(this.page);
        this.ordersReviewPage = new OrdersReviewPage(this.page);
        this.orderHistoryPage = new OrdersHistoryPage(this.page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getDashboardPage()
    {
        return this.dashboardPage;
    }

    getCartCheckoutPage()
    {
        return this.cartCheckoutPage;
    }

    getOrderReviewPage()
    {
        return this.ordersReviewPage;
    }

    getOrderHistoryPage()
    {
        return this.orderHistoryPage;
    }

}
module.exports = {POManager};
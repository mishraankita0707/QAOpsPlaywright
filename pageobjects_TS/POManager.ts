//const {LoginPage} = require('./LoginPage'); //javascript
import {LoginPage} from './LoginPage'; //typescript
//const {DashboardPage} = require('./DashboardPage'); //JS
import {DashboardPage} from './DashboardPage'; //TS
//const {CartCheckoutPage} = require('./CartCheckoutPage'); //JS
import {CartCheckoutPage} from './CartCheckoutPage'; //TS
//const {OrdersReviewPage} = require('./OrdersReviewPage'); //JS
import {OrdersReviewPage} from './OrdersReviewPage'; //TS
//const {OrdersHistoryPage} = require('./OrdersHistoryPage'); //JS
import {OrdersHistoryPage} from './OrdersHistoryPage'; //TS
import {Page} from '@playwright/test';

export class POManager
{
    loginPage : LoginPage;
    dashboardPage : DashboardPage;
    cartCheckoutPage : CartCheckoutPage;
    ordersReviewPage : OrdersReviewPage;
    orderHistoryPage : OrdersHistoryPage;
    page : Page;
    constructor(page:any)
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
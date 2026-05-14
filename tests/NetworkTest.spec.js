const {test,expect,request} = require("@playwright/test");
const { create } = require("domain");
const loginPayload = {userEmail: "mishraankita0794@gmail.com", userPassword: "Password@7"};
const orderPayload = {orders: [{country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};
const {APIUtils} = require('../utils/APIUtils');
const fakePayloadOrders = {data:[],message:"No Orders"};

//let token;
//let orderId;
let response;
test.beforeAll( async ()=>
{
    //runs before all the tests are executed
    //Login API
    const apiContext= await request.newContext();
    const apiUtils = new APIUtils(apiContext,loginPayload);
    response= await apiUtils.createOrder(orderPayload);

}); 

//create order is success
test('Place the order', async({page})=>
{

    //Inserting token to browser local storage
    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token /*token*/);
    await page.goto("https://rahulshettyacademy.com/client/");
    //view order 
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/id=*",
    async route =>
    {
        const response = await page.request.fetch(route.request());
        const body = JSON.stringify(fakePayloadOrders);
        //fulfill() method is used below to intercept response calls
        route.fulfill(
            {
                response,
                body
            }
        )
        //intercepting the response- API will give back the response-->{playwright will send fake response} send the response to browser-->using that response broser will render data on frontend
    });
    
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/id=*");
    //await page.pause();
    console.log(await page.locator(".mt-4").textContent());
    
});



const {test,expect,request} = require("@playwright/test");
const { create } = require("domain");
const loginPayload = {userEmail: "mishraankita0794@gmail.com", userPassword: "Password@7"};
const orderPayload = {orders: [{country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};
const {APIUtils} = require('../utils/APIUtils');

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

    /*const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data: loginPayload
    })
    expect((loginResponse).ok()).toBeTruthy(); //for success status codes: 200, 201 etc.
    const loginResponseJson= await loginResponse.json(); //json() returns the JSON representation of response body
    token =loginResponseJson.token;
    console.log(token);*/ //Add this code in APIUtil.js

    //Order API
    /*const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 
    {
        data: orderPayload,
        headers: {
                    'Authorization' :token,
                    'content-type'  :'application/json'
                 }
    })
    const orderResponseJson= await orderResponse.json();
    console.log(orderResponseJson);
    orderId= orderResponseJson.orders[0];*/ //Add this code in APIUtil.js

}); //Add this code in APIUtil.js

/*test.beforeEach( ()=>
{
    //runs before each individual tests

});*/

//create order is success
test('Place the order', async({page})=>
{

    //Inserting token to browser local storage
    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token /*token*/);
    await page.goto("https://rahulshettyacademy.com/client/");
    //view order 
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows= await page.locator("tbody tr");
    const orderCount= await rows.count();
    for(let i=0; i<orderCount; i++)
    {
        const rowOrderId= await rows.nth(i).locator("th").textContent();
        if(response.orderId/*orderId*/.includes(rowOrderId))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails= await page.locator(".col-text").textContent();
    await page.pause;
    expect(response.orderId/*orderId*/.includes(orderIdDetails)).toBeTruthy();

});

//Verify if order created is showing in history page
//Precondition- create order. Check if there is an API call to create order. That way we can skip the placing order steps

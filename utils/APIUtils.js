class APIUtils
{
    
    constructor(apiContext,loginPayload)
    {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }
    
    async getToken()
    {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
       {
        data: this.loginPayload
       });
    //expect((loginResponse).ok()).toBeTruthy(); //for success status codes: 200, 201 etc.
    const loginResponseJson= await loginResponse.json(); //json() returns the JSON representation of response body
    const token =loginResponseJson.token;
    console.log(token);
    return token;
    }

    async createOrder(orderPayload)
    {
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 
       {
        
        data: orderPayload,
        headers: {
                    'Authorization' :response.token,  //earlier -->'Authorization' :this.getToken(),
                    'content-type'  :'application/json'
                 }
       })
    const orderResponseJson= await orderResponse.json();
    console.log(orderResponseJson);
    const orderId= orderResponseJson.orders[0];
    response.orderId = orderId;
    return response;  //earlier --> return orderId;

    }
}

module.exports = {APIUtils};
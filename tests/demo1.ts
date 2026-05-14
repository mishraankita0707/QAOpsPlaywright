import { expect, type Locator, type Page } from '@playwright/test';
let message1 : string = "hello"; //datatype should be mentioned explicitly
message1 = "Byee";
console.log(message1);
let age1 : number = 25;
console.log(age1);
let isActive : boolean = false;
let numberArray : number[] = [1,2,3];

let data : any = "This could be anything" //any keyword helps assign a datatype in runtime
data = 42;

//function in TS
function add(a:number,b:number) : number
{
    return a+b;
}
add(3,4);

//object in TS
let user : {name:string, age:number,location:string } = {name : "Bob", age : 20, location : "Delhi"};
user.location = "Goa";

//constructor and classes
class CartCheckoutPage{

    page: Page;
    cartProducts : Locator;
    productsText : Locator;
    cart : Locator;
    orders : Locator;
    checkout : Locator;
    constructor(page : any)
    {
        this.page= page;
        this.cartProducts = page.locator("div li").first();
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
        //this.getProductLocator = page.locator("h3:has-text('ZARA COAT 3')")
        this.checkout = page.locator("text=Checkout");
    }
}
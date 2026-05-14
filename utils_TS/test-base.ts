//const base = require('@playwright/test');
import { test as baseTest} from '@playwright/test';
interface TestDataForOrder {
    useremail: string;
    password: string;
    productName : string;
};
export const customTest = baseTest.extend<{testDataForOrder:TestDataForOrder}>(   //exports is used to make this file visible to the entire framework
{
 testDataForOrder : {
     useremail : "mishraankita0794@gmail.com",
     password : "Password@7",
     productName : "ZARA COAT 3"
    }

}
)
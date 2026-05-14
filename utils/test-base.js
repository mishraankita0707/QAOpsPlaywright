const base = require('@playwright/test');

exports.customtest = base.test.extend(   //exports is used to make this file visible to the entire framework
{
 testDataForOrder : {
     useremail : "mishraankita0794@gmail.com",
     password : "Password@7",
     productName : "ZARA COAT 3"
    }

}
)
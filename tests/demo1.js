"use strict";
let message1 = "hello"; //datatype should be mentioned explicitly
message1 = "Byee";
console.log(message1);
let age1 = 25;
console.log(age1);
let isActive = false;
let numberArray = [1, 2, 3];
let data = "This could be anything"; //any keyword helps assign a datatype in runtime
data = 42;
//function in TS
function add(a, b) {
    return a + b;
}
add(3, 4);
//object in TS
let user = { name: "Bob", age: 20 };
user.location = "Goa";

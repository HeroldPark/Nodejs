var util = require('util');
function Parent() {
}

Parent.prototype.sayHello = function() {
    console.log('hello World, from Parent Class');
}

var obj = new Parent();
obj.sayHello();

util.inherits(Child, Parent);

function Child() {
}

var obj2 = new Child();
obj2.sayHello();
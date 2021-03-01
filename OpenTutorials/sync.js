var fs = require('fs');

//readFileSync
console.log('A');
var result  = fs.readFileSync('data/sample1.txt', 'utf8');
console.log(result);
console.log('C');

//readFileSync
console.log('A');
fs.readFile('data/sample1.txt', 'utf8', (error, result) => {
    console.log(result);
});
console.log('C');
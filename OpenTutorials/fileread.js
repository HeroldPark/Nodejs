var fs = require('fs');
var fileName = "sample.txt";

fs.readFile(`data/${fileName}`, 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data);
});
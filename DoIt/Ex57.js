var express = require('express');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(function(req, res, next) {
    console.log('첫번째 미들웨어 호출됨');

    req.user = 'Mike';
    next();
});

app.use(function(req, res, next) {
    console.log('두번째 미들웨어 호출됨');

    //res.send('<h1>서버에서 응답한 결과입니다.'+ req.user +'</h1>');

    var person = {name:'소녀시대', age:20};
    //res.send(person);

    var personStr = JSON.stringify(person);
    //res.send(personStr);

    res.writeHead('200', {"Content-Type":"application/json;charset=utf8"});
    res.write(personStr);
    res.end();
});

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('Execute Express Web Server : ', app.get('port'));
});
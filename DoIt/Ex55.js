var express = require('express');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(function(req, res, next) {
    console.log('첫번째 미들웨어 호출됨');

    //res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
    //res.end('<h1>서버에서 응답한 결과입니다.</h1>');

    //res.redirect('http://google.com');

    var userAgent = req.header('User-Agent');
    var paramName = req.query.name; // GET 방식, POST 방식 : req.

    res.send('<h3>서버에서 응답 : User-Agent ->' + userAgent + '</h3> Param Name -> ' + paramName + '</h3>')
});

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('Execute Express Web Server : ', app.get('port'));
});
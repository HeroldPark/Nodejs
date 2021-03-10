var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');

var bodyParser = require('body-parser');    // POST 방식 사용할때..

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(static(path.join(__dirname, 'public')));    // 특정 folder 아래 데이터 참조 가능
app.use('/public', static(path.join(__dirname, 'public'))); // 이렇게도 가능

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    console.log('첫번째 미들웨어 호출됨');

    var userAgent = req.header('User-Agent');
    //var paramName = req.query.name; // GET 방식
    var paramName = req.body.name || req.query.name ;  // POST 방식 

    res.send('<h3>서버에서 응답 : User-Agent ->' + userAgent + '</h3> Param Name -> ' + paramName + '</h3>')
});

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('Execute Express Web Server : ', app.get('port'));
});
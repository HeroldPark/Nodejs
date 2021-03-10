var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');

var bodyParser = require('body-parser');    // POST 방식 사용할때..

var app = express();

app.set('port', process.env.PORT || 3000);
// app.use(static(path.join(__dirname, 'public')));    // 특정 folder 아래 데이터 참조 가능
app.use('/public', static(path.join(__dirname, 'public'))); // 이렇게도 가능

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var router = express.Router();

router.route('/process/login').post(function(req, res) {
    console.log('/process/login 라우팅 함수에서 받음.');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
    res.write("<h1>서버에서 로그인 응답</h1>");
    res.write("<div><p>"+paramId+"</p></div>");
    res.write("<div><p>"+paramPassword+"</p></div>");
    res.end();
});

app.use('/', router);

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('Execute Express Web Server : ', app.get('port'));
});
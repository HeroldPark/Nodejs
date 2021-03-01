// 데이터가 추가 되더라도 프로그램의 수정 없이 자동적으로 해당되는 리스트가 추가된다.

var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title, list, body) {
    return `
        <!doctype html>
        <html>
        <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            ${body}
        </body>
        </html>
    `;
}

function templateList(fileList) {
    var list = '<ul>';
    fileList.forEach(element => {
        list += `
            <li><a href="/?id=${element}">${element}</a></li>
        `;
    });
    list += '</ul>';

    return list;
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    // console.log(url.parse(_url, true));

    if(pathname === '/'){
        if(queryData.id === undefined) {
            fs.readdir('./data', (error, fileList) => {
                var title = "Welcome";
                var description = "Hello, Node.js";
                var list = templateList(fileList);
                var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
                response.writeHead(200);
                response.end(template);
            });
        }
        else {
            fs.readdir('./data', (error, fileList) => {
                fs.readFile(`data/${queryData.id}`, 'utf-8', (err, description) => {
                    var title = queryData.id;
                    var list = templateList(fileList);
                    var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
                    response.writeHead(200);
                    response.end(template);
                });
            });
        }
    }
    else {
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);
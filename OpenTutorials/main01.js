var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    //console.log(queryData.id);
    console.log(url.parse(_url, true));
    if(_url == '/'){
        //_url = '/index.html';
        title = "Welcome";
    }
    if(_url == '/favicon.ico'){
        response.writeHead(404);
        response.end();
        return;
    }
    response.writeHead(200);
    //console.log(__dirname + _url);
    //response.end(fs.readFileSync(__dirname + _url));
    fs.readFile(`data/${queryData.id}`, 'utf-8', (err, description) => {
        if (err) throw err;

        var template = `
            <!doctype html>
            <html>
            <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
            </head>
            <body>
                <h1><a href="/">WEB</a></h1>
                <ul>
                    <li><a href="/?id=HTML">HTML</a></li>
                    <li><a href="/?id=CSS">CSS</a></li>
                    <li><a href="/?id=Javascript">JavaScript</a></li>
                </ul>
                <h2>${title}</h2>
                <p>${description}</p>
            </body>
            </html>    
            `;
        response.end(template);
    });
    //response.end('Herold : ' + url);
});
app.listen(3000);
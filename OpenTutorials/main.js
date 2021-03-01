// 데이터가 추가 되더라도 프로그램의 수정 없이 자동적으로 해당되는 리스트가 추가된다.
// 오염된 정보가 들어 오는것 차단. - filtered
// XSS 차단 : npm sanitize
// npm init
// 'sanitize-html' : <script> 태그와 같은 예민한 태그는 없애 버린다.
console.log('npm sanitize-html');

var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

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
                var list = template.list(fileList);
                var html = template.html(title, list, 
                    `<h2>${title}</h2><p>${description}</p>`, 
                    `<a href="/create">Create</a>`
                );
                response.writeHead(200);
                response.end(html);
            });
        }
        else {
            fs.readdir('./data', (error, fileList) => {
                var filteredId = path.parse(queryData.id).base;
                fs.readFile(`data/${filteredId}`, 'utf-8', (err, description) => {
                    var title = queryData.id;
                    var list = template.list(fileList);
                    var html = template.html(title, list, 
                        `<h2>${title}</h2><p>${description}</p>`,
                        `<a href="/create">Create</a>...
                         <a href="/update?id=${title}">Update</a>...
                         <form action="delete_process" method="post">
                            <input type="hidden" name="id" value="${title}">
                            <input type="submit" value="Delete">
                         </form>
                        `
                    );
                    response.writeHead(200);
                    response.end(html);
                });
            });
        }
    }
    else if(pathname === '/create'){
        fs.readdir('./data', (error, fileList) => {
            var title = "Welcome";
            var description = "Hello, Node.js";
            var list = template.list(fileList);
            var html = template.html(title, list, `
                <form action="/create_process" method="post">
                <p><input type="text" name="title" placeholder="title"></p>
                
                <p><textarea name="description" placeholder="description"></textarea></p>
                
                <input type="submit">
                </form>
                `, '');
            response.writeHead(200);
            response.end(html);
        });
    }
    else if(pathname === '/create_process'){
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            //console.log(post);
            var title = post.title;
            var description = post.description
            fs.writeFile(`data/${title}`, description, 'utf-8', (error)=>{
                response.writeHead(302, {Location: `/?id=${title}`});
                response.end();
            });
        });
    }
    else if(pathname === '/update') {
        fs.readdir('./data', (error, fileList) => {
            var filteredId = path.parse(queryData.id).base;
            fs.readFile(`data/${filteredId}`, 'utf-8', (err, description) => {
                var title = queryData.id;
                var sanitizeTitle = sanitizeHtml(title);
                var sanitizeDescription = sanitizeHtml(description, {
                    allowedTags: ['h1']
                });
                var list = template.list(fileList);
                var html = template.html(sanitizeTitle, list, 
                    `
                    <form action="/update_process" method="post">
                    <input type="hidden" name="id" value="${title}">
                    <p><input type="text" name="title" placeholder="title" value=${sanitizeTitle}></p>
                    
                    <p><textarea name="description" placeholder="description">${sanitizeDescription}</textarea></p>
                    
                    <input type="submit">
                    </form>
                    `,
                    `<a href="/create">Create</a>...
                     <a href="/update?id=${sanitizeTitle}">Update</a>
                    `
                );
                response.writeHead(200);
                response.end(html);
            });
        });
    }
    else if(pathname === '/update_process') {
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            //console.log(post);
            var id = post.id;
            var title = post.title;
            var description = post.description;
            //console.log(`${id}, ${title}, ${description}`);
            fs.rename(`data/${id}`, `data/${title}`, (error) => {
                fs.writeFile(`data/${title}`, description, 'utf-8', (error)=>{
                    response.writeHead(302, {Location: `/?id=${title}`});
                    response.end();
                });
            });
        });
    }
    else if(pathname === '/delete_process') {
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            //console.log(post);
            var id = post.id;
            var filteredId = path.parse(id).base;
            fs.unlink(`data/${filteredId}`, (error) => {
                if(error)   throw error;
                console.log(`data/${id} is deleted.`);

                response.writeHead(302, {Location: `/`});
                response.end();
            });
        });
    }
    else {
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);
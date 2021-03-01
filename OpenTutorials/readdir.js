var fs = require('fs');
var dir = './data';

fs.readdirSync(dir, function(error, fileList) => {
    console.log(fileList);
}); // 디렉토리를 읽어온다


// for(var i = 0; i < files.length; i++){
//     var file = files[i];
//     var suffix = file.substr(file.length - 5, file.length); // 확장자 추출
//     console.log(suffix);

//     // 확장자가 json일 경우 읽어 내용 출력
//     if (suffix === '.json'){
//         fs.readFile(dir + '/' + file, function(err, buf){
//             console.log(buf.toString());
//         });
//     }
// }
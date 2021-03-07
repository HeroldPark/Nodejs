npm init -y

npm install ejs express multer tesseract.js

npm install --save-dev nodemon

package.json에서 다음과 같이 수정.
--------------------------------------------------------------
"scripts": {
    //"test": "echo \"Error: no test specified\" && exit 1"
    "start": "nodemon app.js"
  },
--------------------------------------------------------------

app.js에 다음 라인 추가.
--------------------------------------------------------------
console.log("hey");
--------------------------------------------------------------
npm start

npm uninstall tesseract.js  // 버젼이 맞지 않아 삭제...

Node.js 참조하여 수정.
https://github.com/naptha/tesseract.js/blob/master/docs/examples.md

package.json에서
-----------------------------------------------------------------
"tesseract.js": "^2.1.4"
-----------------------------------------------------------------












// We declared all our imports
const express = require("express");
const app = express();
const fs = require("fs");
const multer = require("multer");
const { createWorker } = require('tesseract.js');
const worker = createWorker();

// Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage }).single("avatar");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index");
});

// app.post('/upload', (req, res) => {
//     worker.recognize(
//         req.file,
//         'eng',
//         { logger: m => console.log(m) }
//     ).then(({ data: { text } }) => {
//         console.log(text);
//     })
//     .finally(() => worker.terminate());
// });

app.post('/upload', (req, res) => {
    upload(req, res, err => {
        fs.readFile(`./uploads/${req.file.originalname}`, (err, data) => {
            if(err) return console.log('This is your error', err);
            console.log("upload file...", req.file);

            worker
                .recognize(data, "eng", {tessjs_create_pdf: '1'})
                // .progress((p) => { console.log('progress', p)    })
                .then((result) => {
                    console.log(result.text);
                    // res.send(result.text);
                    // res.redirect('/download');
                })
                .finally(() => worker.terminate());
        });
    });
});

// Tesseract.recognize(myImage).then(function (result) { console.log(result) }) 

app.get("/download", (req, res) => {
    const file = `${__dirname}/tesseract.js-ocr-result.pdf`;
    res.download(file);
});

// Start Up our server
const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => console.log(`Hey I'm running on port ${PORT}`));

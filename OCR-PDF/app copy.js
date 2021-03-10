// We declared all our imports
const express = require("express");
const app = express();
const fs = require("fs");
const multer = require("multer");
const { createWorker } = require("tesseract.js");
const worker = createWorker({
  logger: m => console.log(m), // Add logger here
});

// Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, res, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage }).single("avatar");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index");
});

// ROUTERS
// const upload = multer({ dest: 'uploads/', limits: { fileSize: 5 * 1024 * 1024 } });
// app.post('/upload', upload.single('avatar'), (req, res) => {
//   console.log(req.file);
// });

app.post('/upload', (req, res) => {
    upload(req, res, err => {
        console.log("upload file...", req.file);
        fs.readFile(`./uploads/${req.file.originalname}`, (err, data) => {
            if(err) return console.log('This is your error', err);

            worker
                .recognize(data, "eng", {tessjs_create_pdf: '1'})
                .progress(progress => {
                    console.log(progress);
                })
                .then(result => {
                    //res.send(result.text);
                    res.redirect('/download');
                })
                .finally(() => worker.terminate());
        });
    });
});

// const router = express.Router();
// router.route('/upload').post(function(req, res) {
//     console.log('/upload 라우팅 함수에서 받음.');
// });
// app.use('/', router);

app.get("/download", (req, res) => {
    const file = `${__dirname}/tesseract.js-ocr-result.pdf`;
    res.download(file);
});

// Start Up our server
const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => console.log(`Hey I'm running on port ${PORT}`));

// module.exports = app;
// module.exports = router;

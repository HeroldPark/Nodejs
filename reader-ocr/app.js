const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const {createWorker} = require("tesseract.js");
const worker = createWorker();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./assets");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const uploadController = multer({ storage:storage }).single("ocrfile");

app.set("view engine", "ejs");
app.get("/", (req,res) => {
    res.render("index");
});

app.post("/upload", (req, res) => {
    uploadController(req, res, (err) => {
        fs.readFile(`./assets/${req.file.originalname}`, (err, data) => {
            if(err) return console.log('This is error', err);
            
            console.log("upload file...", req.file);
            
            (async () => {
                await worker.load();
                await worker.loadLanguage("eng");
                await worker.initialize("eng");
                await worker.recognize(data);
                const {data:pdfData} = await worker.getPDF('OCR Result');

                console.log(pdfData);

                fs.writeFileSync(`${req.file.originalname}.pdf`, Buffer.from(pdfData));

                console.log('Generate PDF: tesseract-ocr-result.pdf');

                await worker.terminate();
                let pdfFile = path.join(__dirname, `${req.file.originalname}.pdf`);
                res.download(pdfFile);
            })();
        });
    });
});

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => console.log(`Application is started on port ${PORT}`));
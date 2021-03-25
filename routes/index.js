var express = require('express');
var multer = require('multer');
var path = require('path');
var router = express.Router();
const uuid = require('uuid');
const exec = require('child_process').exec;

 function  execShellCommand(cmd) {
  return new Promise((resolve, reject) => {
   exec(cmd, (error, stdout, stderr) => {
    if (error) {
     console.warn(error);
    }
    resolve(stdout? stdout : stderr);
   });
  });
 }
// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, uuid.v4().toString() + "_" + path.extname(file.originalname));
  }
});

// Init Upload
const upload =  multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('myImage');

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /json/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/upload',upload, async (req, res) => {

      if (req.file == undefined) {
        res.render('index', { msg: "Error : No File Selected" });
      }
      else {
        var cmd = "hackmyresume build ./public/uploads/"+req.file.filename+" TO out/resume.all -t node_modules/jsonresume-theme-daru"
        await execShellCommand(cmd) ;
        var cmd1 = "wkhtmltopdf --margin-left '0mm' --margin-right '0mm' --header-html ./header.html --footer-html ./footer.html ./out/resume.pdf.html ./resumefinal.pdf"
        await execShellCommand(cmd1) ;

        res.render('index', { msg: `File Uploaded!${req.file.originalname}`, file: `/download/${req.file.filename}` });
      }
});

router.get('/download/:id', (req, res) => {
  
  res.download("./resumefinal.pdf");
});
module.exports = router;

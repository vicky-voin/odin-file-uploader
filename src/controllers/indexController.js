const multer = require("multer");
const upload = multer({ dest: "uploads/" });

exports.processUpload = [
  upload.single("image"),
  function (req, res, next) {
    //req.file for file
    //req.body for txt fields
    console.log(req.file, req.body);
    res.redirect("/");
  },
];

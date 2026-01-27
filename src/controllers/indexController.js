const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const file = require("../models/file.js");

exports.processUpload = [
  upload.single("image"),
  async function (req, res, next) {
    console.log(req.file, req.body);
    try {
      const result = await file.create(
        req.file.filename,
        req.file.size,
        req.body.folderId,
      );

      res.redirect("/");
    } catch (err) {
      next(err);
    }
  },
];

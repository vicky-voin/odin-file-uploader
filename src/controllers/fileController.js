const multer = require("multer");
const fs = require("fs");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, fileFilter: uploadFitlerImages });
const File = require("../models/file.js");
const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv").config();
const supabase = createClient(process.env.STORAGE_URL, process.env.STORAGE_KEY);
const BUCKET_NAME = "images";

function uploadFitlerImages(req, file, cb) {
  const IMAGE_FORMATS = [".jpg", ".jpeg", ".png", ".svg"];
  if (IMAGE_FORMATS.some((format) => file.originalname.endsWith(format))) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Please make sure the file has one of the following formats: " +
          IMAGE_FORMATS,
      ),
    );
  }
}

exports.renderFileDetails = async (req, res, next) => {
  const file = await File.get(req.params.fileId);
  res.render("file", { file });
};

exports.downloadFile = async (req, res, next) => {
  try {
    const file = await File.get(req.params.fileId);
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .download(req.user.id + "/" + file.name);
    if (error) {
      throw new Error("Could not download file: " + error.message);
    }

    const buffer = Buffer.from(await data.arrayBuffer());
    await fs.promises.writeFile(file.name, buffer);

    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

exports.uploadFile = [
  upload.single("image"),
  async function (req, res, next) {
    try {
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(req.user.id + "/" + req.file.originalname, req.file.buffer);

      if (error) {
        throw new Error("Could not upload to storage: " + error.message);
      }

      const urlResult = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(data.path);

      const result = await File.create(
        req.file.originalname,
        req.file.size,
        urlResult.data.publicUrl,
        req.body.folderId,
      );

      next();
    } catch (err) {
      next(err);
    }
  },
];

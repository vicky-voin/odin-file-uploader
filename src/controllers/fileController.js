const File = require("../models/file");

exports.renderFileDetails = async (req, res, next) => {
  const file = await File.get(req.params.fileId);
  res.render("file", { file });
};

exports.downloadFile = async (req, res, next) => {
  const file = await File.get(req.params.fileId);
  //TODO: implement actual download
  console.log("downloaded file");
  res.redirect("/");
};

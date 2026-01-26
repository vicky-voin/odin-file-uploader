const folder = require("../models/folder.js");

exports.createNewFolder = async (req, res, next) => {
  try {
    const result = folder.create(req.body.name, req.user.id);

    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

exports.deleteFolder = async (req, res, next) => {
  try {
    const result = folder.delete(req.body.folderId, req.user.id);

    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

exports.renameFolder = async (req, res, next) => {
  try {
    const result = folder.rename(req.body.name, req.body.id);

    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

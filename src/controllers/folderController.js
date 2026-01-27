const folder = require("../models/folder.js");

exports.createNewFolder = async (req, res, next) => {
  try {
    const result = await folder.create(req.body.name, req.user.id);

    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

exports.deleteFolder = async (req, res, next) => {
  try {
    const result = await folder.delete(+req.params.folderId, req.user.id);

    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

exports.renameFolder = async (req, res, next) => {
  try {
    const result = await folder.rename(req.body.name, +req.params.folderId);

    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

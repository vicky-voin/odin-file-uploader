const { Router } = require("express");
const { uploadFile } = require("../controllers/fileController");
const folder = require("../models/folder");

const indexRouter = Router();

indexRouter.get("/", async (req, res) => {
  renderIndexPage(req, res, null);
});

indexRouter.post("/", uploadFile, async (req, res) => {
  res.redirect("/");
});

async function renderIndexPage(req, res, error) {
  if (!req.user) {
    res.render("index", { user: undefined, folders: [] });
  } else {
    const folders = await folder.getAllForUser(req.user.id);
    res.render("index", {
      user: req.user,
      folders: folders,
      error: { msg: error?.message },
    });
  }
}

module.exports = indexRouter;

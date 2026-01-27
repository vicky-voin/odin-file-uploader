const { Router } = require("express");
const { processUpload } = require("../controllers/indexController");
const folder = require("../models/folder");

const indexRouter = Router();

indexRouter.get("/", async (req, res) => {
  const folders = await folder.getAllForUser(req.user.id);
  res.render("index", { user: req.user, folders: folders });
});

indexRouter.post("/", processUpload);

module.exports = indexRouter;

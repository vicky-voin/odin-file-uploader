const { Router } = require("express");
const {
  createNewFolder,
  deleteFolder,
  renameFolder,
} = require("../controllers/folderController");

const folderRouter = Router();

folderRouter.get("/new", (req, res) => {
  res.render("createFolder");
});

folderRouter.get("/:folderId/delete", (req, res) => {
  res.render("deleteFolder", { folderId: req.params.folderId });
});

folderRouter.get("/:folderId/edit", (req, res) => {
  res.render("editFolder", { folderId: req.params.folderId });
});

folderRouter.post("/new", createNewFolder);
folderRouter.post("/:folderId/delete", deleteFolder);
folderRouter.post("/:folderId/edit", renameFolder);

module.exports = folderRouter;

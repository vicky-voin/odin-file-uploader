const { Router } = require("express");
const {
  renderFileDetails,
  downloadFile,
} = require("../controllers/fileController");

const fileRouter = new Router();

fileRouter.get("/:fileId", renderFileDetails);
fileRouter.get("/:fileId/download", downloadFile);

module.exports = fileRouter;

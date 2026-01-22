const { Router } = require("express");
const { processUpload } = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", async (req, res) => {
  res.render("index", { user: req.user });
});

indexRouter.post("/", processUpload);

module.exports = indexRouter;

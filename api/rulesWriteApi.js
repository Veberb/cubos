const express = require("express");

const router = express.Router({ mergeParams: true });

module.exports = app => {
  app.use("/api/rules", router);
};

router.post("/", (req, res, next) => {});

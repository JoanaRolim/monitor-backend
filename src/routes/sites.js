const express = require("express");
const router = express.Router();
const sitesController = require("../controller/sitesController");

router.post("/", sitesController.addSite);
router.get("/", sitesController.getSites);

module.exports = router;

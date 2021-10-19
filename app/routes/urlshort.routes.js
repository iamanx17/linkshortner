const express = require("express");
const router = express.Router();
const url = require("../controllers/urlshort.controller.js");

router.get("/", url.findAll);
router.post("/", url.create);
router.get("/:urlid", url.findOne);
router.put("/:urlid", url.update);
router.delete("/:urlid", url.delete);

module.exports = router;

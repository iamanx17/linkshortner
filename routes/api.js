const express = require("express");
const api = require("../controllers/api");
const checkAPIKey = require("../middleware/checkapiKey");

const router = express.Router();

router.get("/api/shorturl", checkAPIKey, api.fetchAllShortUrl);
router.post("/api/shorturl", checkAPIKey, api.createShortUrl);

router.get("/api/shorturl/:id", checkAPIKey, api.fetchShortUrlById);
router.post("/api/shorturl/:id", checkAPIKey, api.editShortUrl);

module.exports = router;

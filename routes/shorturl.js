const express = require("express");
const shortUrl = require("../controllers/shorturl");
const isLoggedIn = require("../middleware/islogin");

const router = express.Router();

router.get("/", isLoggedIn.isloggedIn, shortUrl.GetShortUrl);
router.post("/shorturl", isLoggedIn.isloggedIn, shortUrl.PostShortUrl);
router.get("/dashboard", isLoggedIn.isloggedIn, shortUrl.dashboard);

router.get("/register", shortUrl.GetRegister);
router.post("/register", shortUrl.PostRegister);

router.get("/login", shortUrl.GetLogin);
router.post("/login", shortUrl.PostLogin);
router.get("/:id", shortUrl.redirect);

module.exports = router;

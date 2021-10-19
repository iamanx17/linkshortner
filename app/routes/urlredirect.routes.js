const express = require("express");
const router = express.Router();
const urlmodel = require("../models/url.model");

router.get("/", (req, res) => {
  res.send({
    status: true,
    data: {
      message: "Welcome to urlshortner api you can do CRUD operation here!",
      author: "iamanx17",
    },
    create: {
      note: "You can post data using below example",
      urlid: {
        "1337x": "https://google.com",
      },
      getall: {
        url: "/api/",
      },
      getone: {
        url: "/api/<urlid>/",
      },
      update: {
        url: "/api/<urlid>/",
        body: {
          url: "https:reddit.com",
        },
      },
      delete: {
        url: "/api/<urlid>/",
      },
    },
  });
});

router.get("/:key", (req, res) => {
  const key = req.params.key;
  urlmodel.findOne({ key: key }, (err, data) => {
    if (err != null) {
      res.redirect("/");
    } else {
      res.redirect(data.url);
    }
  });
});

module.exports = router;

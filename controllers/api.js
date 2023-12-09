const crypto = require("crypto");
const shorturlModel = require("../models/shorturl");
const userModel = require("../models/user");

module.exports.fetchAllShortUrl = async (req, res, next) => {
  const user = await userModel.findOne({ apiKey: req.headers.authorization });
  const links = await shorturlModel.find({ user: user });
  console.log(links);
  const urllist = [];

  for (let i of links) {
    urllist.push({
      url: i.url,
      shortUrl: i.shortUrl,
      hashId: i.hashId,
      number_of_clicks: i.number_of_clicks,
      browser_used: i.browser_used,
      createdAt: i.createdAt,
      updatedAt: i.updatedAt,
    });
  }

  res.send({
    status: "sucess",
    urlist: urllist,
  });
};

module.exports.fetchShortUrlById = async (req, res, next) => {
  const hashId = req.params.id;
  const linkEntity = await shorturlModel.findOne({ hashId: hashId }).exec();
  console.log(linkEntity);

  if (!linkEntity) {
    return res.status(404).send({
      status: "error",
      message: "No Short Url found with this ID",
    });
  }
  res.send({
    status: "sucess",
    urlist: {
      url: linkEntity.url,
      hashId: linkEntity.hashId,
      shortUrl: linkEntity.shortUrl,
      number_of_clicks: linkEntity.number_of_clicks,
      browser_used: linkEntity.browser_used,
      createdAt: linkEntity.createdAt,
      updatedAt: linkEntity.updatedAt,
    },
  });
};

module.exports.editShortUrl = async (req, res, next) => {
  const hashId = req.params.id;
  const urlinfo = req.body.url;
  const linkEntity = await shorturlModel.findOne({ hashId: hashId });
  if (!linkEntity) {
    return res.status(404).send({
      status: "error",
      found: false,
      info: "No Short exists with this id",
    });
  }
  linkEntity.url = urlinfo;
  await shorturlModel.findOneAndUpdate({ hashId: hashId }, linkEntity);
  return res.send({
    status: "success",
    info: "Short link has been updated successfully",
  });
};

module.exports.createShortUrl = async (req, res, next) => {
  const user = await userModel.findOne({ apiKey: req.headers.authorization });
  const links = req.body.urls;
  let urllist = [];

  for (let i of links) {
    let hashID = crypto.randomBytes(6).toString("hex");
    const linkEntity = new shorturlModel({
      url: i,
      hashId: hashID,
      shortUrl: `https://localhost:3000/${hashID}`,
      user: user,
    });
    urllist.push({
      url: i,
      hashID: hashID,
      shortUrl: `https://localhost:3000/${hashID}`,
    });
    linkEntity.save();
  }
  return res.send({
    status: "success",
    shorturls: urllist,
  });
};

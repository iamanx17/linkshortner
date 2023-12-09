const shorturlModel = require("../models/shorturl");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const crypto = require("crypto");

module.exports.PostShortUrl = async (req, res, next) => {
  const newHashId = crypto.randomBytes(6).toString("hex");
  const shorturl = new shorturlModel({
    url: req.body.url,
    hashId: newHashId,
    shortUrl: `https://localhost:3000/${newHashId}`,
    user: req.session.user,
  });
  await shorturl.save();
  return res.render("home", {
    message: `Your shortn url is https://localhost:3000/${newHashId}`,
    isAuthenticated: req.session.isLoggedIn,
  });
};

module.exports.GetShortUrl = (req, res, next) => {
  return res.render("home", { isAuthenticated: req.session.isLoggedIn });
};
module.exports.dashboard = async (req, res, next) => {
  const shorturlEntity = await shorturlModel.find({
    user: req.session.user._id,
  });
  let shortUrlList = [];
  for (let i of shorturlEntity) {
    shortUrlList.push({
      entity: i,
      entityString: i.toString(),
    });
  }
  return res.render("dashboard", {
    shortUrlList: shortUrlList,
    isAuthenticated: req.session.isLoggedIn,
    api_key: req.session.user.apiKey,
  });
};

module.exports.redirect = async (req, res, next) => {
  const id = req.params.id;
  console.log(req.ip);
  const linkEntity = await shorturlModel.findOne({ hashId: id });
  if (!linkEntity) {
    return next();
  }
  return res.redirect(linkEntity.url);
};

module.exports.GetRegister = (req, res, next) => {
  return res.render("register");
};

module.exports.PostRegister = async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (user) {
    return res.render("register", {
      message: "User already exists",
      isAuthenticated: req.session.isLoggedIn,
    });
  }
  if (req.body.password1 != req.body.password2) {
    return res.render("register", {
      message: "Password not matched",
      isAuthenticated: req.session.isLoggedIn,
    });
  }
  const userEntity = new userModel({
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    email: req.body.email,
    apiKey: uuid.v4(),
    password: await bcrypt.hash(req.body.password1, 10),
  });
  await userEntity.save();
  return res.render("register", {
    message: "User registeration successful",
    isAuthenticated: req.session.isLoggedIn,
  });
};

module.exports.GetLogin = (req, res, next) => {
  return res.render("login");
};

module.exports.PostLogin = async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return res.render("login", {
      message: "user not found!!",
      isAuthenticated: req.session.isLoggedIn,
    });
  }
  const checkIfValid = await bcrypt.compare(req.body.password, user.password);
  if (!checkIfValid) {
    return res.render("login", {
      message: "password not matched",
      isAuthenticated: req.session.isLoggedIn,
    });
  }

  req.session.user = user;
  req.session.isLoggedIn = true;
  return res.redirect("/");
};

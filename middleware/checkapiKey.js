const userModel = require("../models/user");

module.exports = checkAPIKey = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send({
      message: "API key is missing",
    });
  }

  if (req.headers.authorization) {
    const user = await userModel.findOne({ apiKey: req.headers.authorization });
    if (!user) {
      return res.status(403).send({
        message: "Invalid Api key",
      });
    }
  }
  next();
};

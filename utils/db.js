const mongoose = require("mongoose");

module.exports.connectDB = (URL) => {
  mongoose.connect(URL);
};

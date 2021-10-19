var mongoose = require("mongoose");

var urlModelSchema = new mongoose.Schema(
  {
    urlid: {
      type: String,
      required: true,
      unique: true,
    },
    url: {
      type:String,
      default:'/' ,
      required: true,
    },
    key: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("urlmodel", urlModelSchema);

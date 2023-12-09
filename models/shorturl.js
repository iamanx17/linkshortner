const mongoose = require("mongoose");

const linkSchema = mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    hashId: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
    number_of_clicks: {
      type: Number,
      required: false,
      default: 0,
    },
    browser_used: [
      {
        type: String,
        required: false,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Link", linkSchema);

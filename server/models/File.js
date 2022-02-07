const mongoose = require("mongoose");
const File = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  accessLink: {
    type: String,
  },
  size: {
    type: Number,
    default: 0,
  },
  path: {
    type: String,
    default: "",
  },
  user: {
    type: mongoose.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  parent: {
    type: mongoose.ObjectId,
    ref: "File",
  },
  children: [
    {
      type: mongoose.ObjectId,
      ref: "File",
    },
  ],
});
module.exports = mongoose.model("File", File);

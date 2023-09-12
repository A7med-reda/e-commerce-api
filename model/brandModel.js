/* eslint-disable new-cap */
const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name required"],
      unique: [true, "Category name must be unique"],
      minLength: [3, "Too short for category name"],
      maxLength: [32, "Too big fro category name"],
    },
    slug: { type: String, lowercase: true }, 
    image: String,
  },
  { timestamps: true }
);

module.exports = new mongoose.model("brand", brandSchema);

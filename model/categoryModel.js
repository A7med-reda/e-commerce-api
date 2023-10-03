const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Category name required"],
      unique: [true, "Category name must be unique"],
      minLength: [3, "Too short for category name"],
      maxLength: [32, "Too big fro category name"],
    },
    slug: { type: String, lowercase: true }, //category name  A and B -->hashed -> a-and-b
    image: String,
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Category", categorySchema);

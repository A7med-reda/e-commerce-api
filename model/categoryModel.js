const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name required"],
      unique: [true, "Category name must be unique"],
      minLength: [3, "too short for category name"],
      maxLength: [32, "too big fro category name"],
    },
    slug: { type: String, lowerCase: true }, //category name  A and B -->hashed -> a-and-b
  },
  { timestamps: true } // created at , updated at
);
const CategoryModel = new mongoose.model("category", categorySchema);

module.exports = CategoryModel;

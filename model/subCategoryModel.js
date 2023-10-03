const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,

      trim: true,
      unique: [true, "SubCategory name must be unique "],
      minLength: [2, "Too short subCategory Name"],
      maxLength: [32, "Too long subCategory Name "],
    },
    slug: { type: String, lowercase: true },
    parentCategory: {
      type: mongoose.Schema.ObjectId,
      ref: "Category", //  model name of parent from model method , replace || populate()
      required: [true, "subCategory Must Blog to a Parent Category "],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubCategory", subCategorySchema);

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

const setImageURL = (doc) => {
  if (doc.image) {
    const imageURL = `${process.env.BASE_URL}/categories/${doc.image}`;
    doc.image = imageURL;
  }
};

//findAll , findOne , update
categorySchema.post("init", (doc) => {
  setImageURL(doc);
});

// create
categorySchema.post("save", (doc) => {
  setImageURL(doc);
});

module.exports = new mongoose.model("Category", categorySchema);

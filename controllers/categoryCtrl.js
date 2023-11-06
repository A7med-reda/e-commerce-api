const asyncHandler = require("express-async-handler");
const sharp = require("sharp");

const Category = require("../model/categoryModel");
const factory = require("./factoryHandler");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");

//upload category image
exports.uploadCategoryImage = uploadSingleImage("image");

// resize image
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `category-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/categories/${filename}`);

  // save image name into db
  req.body.image = filename;
  next();
});

//@desc   Get list of categories
//@route  GET api/v1/categories
//@access public
exports.getCategories = factory.getAll(Category);

//@decs   get specific category with id
//@route  GET ap1/v1/category/:id
//@access public
exports.getSpecificCategory = factory.getOne(Category);

//@desc    create category
//@route   POST api/v1/categories
//@access  private
exports.createCategory = factory.createOne(Category);

//@desc    update category /:id
//@route   PUT api/v1/categories/:id
//@access  private
exports.updateCategory = factory.updateOne(Category);

//@desc    delete category /:id
//@route   DELETE api/v1/categories/:id
//@access  private
exports.deleteCategory = factory.deleteOne(Category);

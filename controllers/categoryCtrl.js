const slugify = require("slugify"); // ahmed reda -> ahmed-reda
const asyncHandler = require("express-async-handler");
const Category = require("../model/categoryModel");
const ApiError = require("../utils/apiError");

//@desc   Get list of categories
//@route  GET api/v1/categories
//@access public
exports.getCategories = asyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit; //skip (2-1)*5= 5
  const categories = await Category.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
});

//@decs   get specific category with id
//@route  GET ap1/v1/category/:id
//@access public
exports.getSpecificCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate({
    path: "parentCategory",
  });
  if (!category) {
    return next(new ApiError(`No Category for this is id ${id}`, 400));
  }
  res.status(200).json({ data: category });
});

//@desc    create category
//@route   POST api/v1/categories
//@access  private
exports.createCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const category = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category }); // req created
});

//@desc    update category /:id
//@route   PUT api/v1/categories/:id
//@access  private

exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true } // return doc after update
  );
  if (!category) {
    return next(new ApiError(`No Category for this is id ${id}`, 400));
  }
  res.status(200).json({ data: category });
});

//@desc    delete category /:id
//@route   DELETE api/v1/categories/:id
//@access  private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    return next(new ApiError(`No Category for this is id ${id}`, 400));
  }
  res.status(204).send(); //204 deleted successfully
});

const slugify = require("slugify"); // ahmed reda -> ahmed-reda
const CategoryModel = require("../model/categoryModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

//@desc   Get list of categories
//@route  GET api/v1/categories
//@access public
exports.getCategory = asyncHandler(async (req, res, next) => {
  let page = req.query.page * 1 || 1;
  let limit = req.query.limit * 1 || 5;
  let skip = (page - 1) * limit; //skip (2-1)*5= 5
  let categories = await CategoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
});

//@decs   get specific category with id
//@route  GET ap1/v1/category/:id
//@access public
exports.getSpecificCategory = asyncHandler(async (req, res, next) => {
  let { id } = req.params;
  let category = await CategoryModel.findById(id);
  if (!category) {
    return next(new ApiError(`No Category for this is id ${id}`, 400));
  }
  res.status(200).json({ data: category });
});

//@desc    create category
//@route   POST api/v1/categories
//@access  private
exports.createCategory = asyncHandler(async (req, res, next) => {
  let { name } = req.body;
  let category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category }); // req created
});

//@desc    update category /:id
//@route   PUT api/v1/categories/:id
//@access  private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await CategoryModel.findOneAndUpdate(
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
  const category = await CategoryModel.findOneAndDelete(id);
  if (!category) {
    return next(new ApiError(`No Category for this is id ${id}`, 400));
  }
  res.status(204).send(); //204 deleted successfully
});

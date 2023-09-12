const slugify = require("slugify"); // ahmed reda -> ahmed-reda
const asyncHandler = require("express-async-handler");
const SubCategory = require("../model/subCategoryModel");
const ApiError = require("../utils/apiError");

//@desc    create subCategory
//@route   POST api/v1/subcategories
//@access  private
exports.CreateSubCategory = asyncHandler(async (req, res, next) => {
  const { name, parentCategory } = req.body;
  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    parentCategory,
  });
  res.status(201).json({ data: subCategory });
});

//@desc   Get list of subCategories
//@route  GET api/v1/subcategories
//@access public
exports.getSubCategories = asyncHandler(async (req, res, next) => {
  // pagination
  const limit = req.query.limit * 1 || 5;
  const page = req.query.page * 1 || 1;
  const skip = (page - 1) * limit;
  let filterObj = {};
  if (req.params.categoryId)
    filterObj = { parentCategory: req.params.categoryId };
  const subCategories = await SubCategory.find(filterObj)
    .limit(limit)
    .skip(skip)
    .populate({ path: "parentCategory", select: "name -_id" });
  res
    .status(200)
    .json({ results: subCategories.length, page, data: subCategories });
});

//@decs   get specific subCategory with id
//@route  GET ap1/v1/subcategory/:id
//@access public
exports.getSpecificSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await SubCategory.findById(id);

  if (!category) {
    return next(new ApiError(`No Category for This id ${id}`, 400));
  }
  res.status(200).json({ data: category });
});

//@desc    update subCategory /:id
//@route   PUT api/v1/subcategories/:id
//@access  private
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, parentCategory } = req.body;
  const subCategory = await SubCategory.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), parentCategory },
    { new: true }
  );
  if (!subCategory) {
    return next(new ApiError(`No subCategory for this is Id ${id}`, 400));
  }
  res.status(200).json({ data: subCategory });
});

//@desc    delete subCategory /:id
//@route   DELETE api/v1/subcategories/:id
//@access  private
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findByIdAndDelete(id);
  if (!subCategory) {
    return next(new ApiError(`No subCategory for this is Id ${id}`, 400));
  }
  res.status(204).send();
});

const SubCategory = require("../model/subCategoryModel");
const factoryHandler = require("./factoryHandler");

//@desc    create subCategory
//@route   POST api/v1/subcategories
//@access  private
exports.CreateSubCategory = factoryHandler.createOne(SubCategory);

// Nested route
// GET /api/v1/categories/:categoryId/subcategories
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId)
    filterObject = { parentCategory: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};

//@desc   Get list of subCategories
//@route  GET api/v1/subcategories
//@access public
exports.getSubCategories = factoryHandler.getAll(SubCategory);

//@decs   get specific subCategory with id
//@route  GET ap1/v1/subcategory/:id
//@access public
exports.getSpecificSubCategory = factoryHandler.getOne(SubCategory);

//@desc    update subCategory /:id
//@route   PUT api/v1/subcategories/:id
//@access  private
exports.updateSubCategory = factoryHandler.updateOne(SubCategory);

//@desc    delete subCategory /:id
//@route   DELETE api/v1/subcategories/:id
//@access  private
exports.deleteSubCategory = factoryHandler.deleteOne(SubCategory);

const SubCategory = require("../model/subCategoryModel");
const factory = require("./factoryHandler");

//@desc    create subCategory
//@route   POST api/v1/subcategories
//@access  private
exports.CreateSubCategory = factory.createOne(SubCategory);

//@desc   Nested route
//@route  GET /api/v1/categories/:categoryId/subcategories
//@access public
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
exports.getSubCategories = factory.getAll(SubCategory);

//@decs   get specific subCategory with id
//@route  GET ap1/v1/subcategory/:id
//@access public
exports.getSpecificSubCategory = factory.getOne(SubCategory);

//@desc    update subCategory /:id
//@route   PUT api/v1/subcategories/:id
//@access  private
exports.updateSubCategory = factory.updateOne(SubCategory);

//@desc    delete subCategory /:id
//@route   DELETE api/v1/subcategories/:id
//@access  private
exports.deleteSubCategory = factory.deleteOne(SubCategory);

const Category = require("../model/categoryModel");
const factoryHandler = require("./factoryHandler");

//@desc   Get list of categories
//@route  GET api/v1/categories
//@access public
exports.getCategories = factoryHandler.getAll(Category);

//@decs   get specific category with id
//@route  GET ap1/v1/category/:id
//@access public
exports.getSpecificCategory = factoryHandler.getOne(Category);

//@desc    create category
//@route   POST api/v1/categories
//@access  private
exports.createCategory = factoryHandler.createOne(Category);

//@desc    update category /:id
//@route   PUT api/v1/categories/:id
//@access  private
exports.updateCategory = factoryHandler.updateOne(Category);

//@desc    delete category /:id
//@route   DELETE api/v1/categories/:id
//@access  private
exports.deleteCategory = factoryHandler.deleteOne(Category);

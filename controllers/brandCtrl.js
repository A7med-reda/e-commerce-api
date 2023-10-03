const Brand = require("../model/brandModel");
const factoryHandler = require("./factoryHandler");

//@desc   Get list of brands
//@route  GET api/v1/brands
//@access public
exports.getBrands = factoryHandler.getAll(Brand);

//@decs   get specific brand with id
//@route  GET ap1/v1/brands/:id
//@access public
exports.getSpecificBrand = factoryHandler.getOne(Brand);

//@desc    create brand
//@route   POST api/v1/brands
//@access  private
exports.createBrand = factoryHandler.createOne(Brand);

//@desc    update brand /:id
//@route   PUT api/v1/brands/:id
//@access  private
exports.updateBrand = factoryHandler.updateOne(Brand);

//@desc    delete brand /:id
//@route   DELETE api/v1/brands/:id
//@access  private
exports.deleteBrand = factoryHandler.deleteOne(Brand);

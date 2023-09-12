const slugify = require("slugify"); // ahmed reda -> ahmed-reda
const asyncHandler = require("express-async-handler");
const Brand = require("../model/brandModel");
const ApiError = require("../utils/apiError");

//@desc   Get list of brands
//@route  GET api/v1/brands
//@access public
exports.getBrands = asyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit; //skip (2-1)*5= 5
  const brands = await Brand.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: brands.length, page, data: brands });
});

//@decs   get specific brand with id
//@route  GET ap1/v1/brands/:id
//@access public
exports.getSpecificBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  if (!brand) {
    return next(new ApiError(`No Brand for this is id ${id}`, 400));
  }
  res.status(200).json({ data: brand });
});

//@desc    create brand
//@route   POST api/v1/brands
//@access  private
exports.createBrand = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const brand = await Brand.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand }); // req created
});

//@desc    update brand /:id
//@route   PUT api/v1/brands/:id
//@access  private
exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const brand = await Brand.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true } // return doc after update
  );
  if (!brand) {
    return next(new ApiError(`No Brand for this is id ${id}`, 400));
  }
  res.status(200).json({ data: brand });
});

//@desc    delete brand /:id
//@route   DELETE api/v1/brands/:id
//@access  private
exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndDelete(id);
  if (!brand) {
    return next(new ApiError(`No Brand for this is id ${id}`, 400));
  }
  res.status(204).send(); //204 deleted successfully
});

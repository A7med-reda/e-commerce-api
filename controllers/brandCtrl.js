const asyncHandler = require("express-async-handler");
const sharp = require("sharp");

const Brand = require("../model/brandModel");
const factory = require("./factoryHandler");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");

//upload category image
exports.uploadBrandImage = uploadSingleImage("image");

// resize image
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `brand-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/brands/${filename}`);

  // save image name into db
  req.body.image = filename;
  next();
});

//@desc   Get list of brands
//@route  GET api/v1/brands
//@access public
exports.getBrands = factory.getAll(Brand);

//@decs   get specific brand with id
//@route  GET ap1/v1/brands/:id
//@access public
exports.getSpecificBrand = factory.getOne(Brand);

//@desc    create brand
//@route   POST api/v1/brands
//@access  private
exports.createBrand = factory.createOne(Brand);

//@desc    update brand /:id
//@route   PUT api/v1/brands/:id
//@access  private
exports.updateBrand = factory.updateOne(Brand);

//@desc    delete brand /:id
//@route   DELETE api/v1/brands/:id
//@access  private
exports.deleteBrand = factory.deleteOne(Brand);

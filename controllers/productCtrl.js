const asyncHandler = require("express-async-handler");
const sharp = require("sharp");

const Product = require("../model/productModel");
const factory = require("./factoryHandler");
const { uploadMixOfImages } = require("../middlewares/uploadImageMiddleware");

exports.uploadProductImages = uploadMixOfImages([
  { name: "imageCover", maxCount: 1 },
  {
    name: "images",
    maxCount: 5,
  },
]);

exports.resizeProductImages = asyncHandler(async (req, res, next) => {
  // 1- image  process  for imageCover
  if (req.files.imageCover) {
    const imageCoverFilename = `product-${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/products/${imageCoverFilename}`);

    // save imageCover name into db
    req.body.imageCover = imageCoverFilename;
  }

  // 2- images process for array of images
  // note map os Sync and sharp is Async
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageName = `product-${Date.now()}-${index + 1}.jpeg`;
        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`uploads/products/${imageName}`);

        // save imageCover name into db
        req.body.images.push(imageName);
      })
    );
  }

  next();
});

//@desc   Get list of products
//@route  GET api/v1/products
//@access public
exports.getProducts = factory.getAll(Product, "product");

//@decs   get specific product with id
//@route  GET ap1/v1/products/:id
//@access public
exports.getSpecificProduct = factory.getOne(Product);

//@desc    create product
//@route   POST api/v1/products
//@access  private
exports.createProduct = factory.createOne(Product);

//@desc    update product /:id
//@route   PUT api/v1/products/:id
//@access  private
exports.updateProduct = factory.updateOne(Product);
//@desc    delete product /:id
//@route   DELETE api/v1/products/:id
//@access  private
exports.deleteProduct = factory.deleteOne(Product);

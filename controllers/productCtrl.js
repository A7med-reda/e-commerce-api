const Product = require("../model/productModel");
const factoryHandler = require("./factoryHandler");

//@desc   Get list of products
//@route  GET api/v1/products
//@access public
exports.getProducts = factoryHandler.getAll(Product, "product");

//@decs   get specific product with id
//@route  GET ap1/v1/products/:id
//@access public
exports.getSpecificProduct = factoryHandler.getOne(Product);

//@desc    create product
//@route   POST api/v1/products
//@access  private
exports.createProduct = factoryHandler.createOne(Product);

//@desc    update product /:id
//@route   PUT api/v1/products/:id
//@access  private
exports.updateProduct = factoryHandler.updateOne(Product);
//@desc    delete product /:id
//@route   DELETE api/v1/products/:id
//@access  private
exports.deleteProduct = factoryHandler.deleteOne(Product);

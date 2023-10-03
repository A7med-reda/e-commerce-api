const { check, body } = require("express-validator");
const slugify = require("slugify");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Category = require("../../model/categoryModel");
const SubCategory = require("../../model/subCategoryModel");

exports.createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("Product title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ max: 400 })
    .withMessage(" Too long Product Description "),
  check("quantity")
    .notEmpty()
    .withMessage("Product Quantity is required")
    .isNumeric()
    .withMessage("Product Quantity must be a number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product Sold Quantity must be a number"),
  check("price")
    .notEmpty()
    .withMessage("Product Price is required")
    .isNumeric()
    .withMessage('Product Price must be a number"')
    .isLength({ max: 20 })
    .withMessage("too long price"),
  check("priceAfterDiscount")
    .optional()
    .isFloat()
    .isNumeric()
    .withMessage('Product priceAfterDiscount must be a number"')
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error("Price cannot be less than priceAfterDiscount");
      }
      return true;
    }),
  check("colors")
    .optional()
    .isArray()
    .withMessage("Colors must array of strings"),
  check("imageCover").notEmpty().withMessage("Product Image cover is required"),
  check("images")
    .optional()
    .isArray()
    .withMessage("Product Images must array of strings"),
  check("category")
    .notEmpty()
    .withMessage("Product must belong to Category")
    .isMongoId()
    .withMessage("invalid ID format")
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No category for this id: ${categoryId}`)
          );
        }
      })
    ),
  check("subcategories")
    .optional()
    .isMongoId()
    .withMessage("invalid ID format")
    .custom((subCategoriesIds) =>
      // Validate input Existence in database
      SubCategory.find({ _id: { $exists: true, $in: subCategoriesIds } }).then(
        (result) => {
          if (result.length < 0 || result.length !== subCategoriesIds.length) {
            return Promise.reject(new Error("invalid SubCategories Ids"));
          }
        }
      )
    )
    .custom((val, { req }) =>
      SubCategory.find({ parentCategory: req.body.category }).then(
        (subcategories) => {
          const subDB = [];
          subcategories.forEach((el) => {
            subDB.push(el._id.toString());
          });
          if (!val.every((el) => subDB.includes(el))) {
            return Promise.reject(
              new Error("SubCategories not belong to ParentCategory")
            );
          }
        }
      )
    ),
  check("brand").optional().isMongoId().withMessage("Invalid ID formate"),
  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("ratingsAverage must be a number")
    .isLength({ min: 1 })
    .withMessage("Rating must be above or equal 1.0")
    .isLength({ max: 5 })
    .withMessage("Rating must be below or equal 5.0"),
  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("ratingsQuantity must be a number"),
  validatorMiddleware,
];

exports.getProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID formate"),
  validatorMiddleware,
];

exports.updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID formate"),
  body("title").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware,
];

exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID formate"),
  validatorMiddleware,
];

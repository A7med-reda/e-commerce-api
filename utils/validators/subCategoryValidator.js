const { check } = require("express-validator");

const validatorMiddleWare = require(`../../middlewares/validatorMiddleware`);
const { default: slugify } = require("slugify");

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory Name required")
    .isLength({ min: 2 })
    .withMessage("Too short for SubCategory Name")
    .isLength({ max: 32 })
    .withMessage("Too big for SubCategory Name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("parentCategory")
    .notEmpty()
    .withMessage("SubCategory Must Belong to a Parent Category")
    .isMongoId()
    .withMessage("Invalid Category id format"),
  validatorMiddleWare,
];
exports.getSubCategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("Id Can't be Empty")
    .isMongoId()
    .withMessage("invalid category id Format"),
  validatorMiddleWare,
];
exports.updateSubCategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("Id can't be Empty")
    .isMongoId()
    .withMessage("invalid category id format"),
  check("name")
    .notEmpty()
    .withMessage("SubCategory Name required")
    .isLength({ min: 2 })
    .withMessage("Too short for SubCategory Name")
    .isLength({ max: 32 })
    .withMessage("Too big for SubCategory Name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  validatorMiddleWare,
];
exports.deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category id Format"),
  validatorMiddleWare,
];

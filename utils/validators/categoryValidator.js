const { check } = require("express-validator");
const validatorMiddleWare = require(`../../middlewares/validatorMiddleware`);

exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category id format"),
  validatorMiddleWare,
];

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category name required")
    .isLength({ min: 3 })
    .withMessage("Too short for category name")
    .isLength({ max: 32 })
    .withMessage("Too big fro category name"),
  validatorMiddleWare,
];

exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category id format"),
  validatorMiddleWare,
];

exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category id format"),
  validatorMiddleWare,
];

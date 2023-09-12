const { check } = require("express-validator");

const validatorMiddleWare = require(`../../middlewares/validatorMiddleware`);

exports.getBrandValidator = [
  check("id").isMongoId().withMessage("invalid Brand id format"),
  validatorMiddleWare,
];

exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand name required")
    .isLength({ min: 3 })
    .withMessage("Too short for Brand name")
    .isLength({ max: 32 })
    .withMessage("Too big fro Brand name"),
  validatorMiddleWare,
];

exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("invalid Brand id format"),
  validatorMiddleWare,
];

exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("invalid Brand id format"),
  validatorMiddleWare,
];

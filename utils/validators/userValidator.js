const slugify = require("slugify");
const { check, body } = require("express-validator");

const User = require("../../model/userModel");
const validatorMiddleWare = require(`../../middlewares/validatorMiddleware`);

exports.getUserValidator = [
  check("id").isMongoId().withMessage("invalid User id format"),
  validatorMiddleWare,
];

exports.createUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("User name required")
    .isLength({ min: 3 })
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check("email")
    .notEmpty()
    .withMessage("Email is Required")
    .isEmail()
    .withMessage("Invalid Email Format")
    .custom((val) => 
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("E-mail is Used before"));
        }
      })
    ),

  check("password")
    .notEmpty()
    .withMessage("Password Required")
    .isLength({ min: 6 })
    .withMessage("Password must At lest 6 characters"),
  
    check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invalid Phone number only Allowed Egy &  Su "),
  
    check("profileImage").optional(),
  
    check("role").optional(),
  
    validatorMiddleWare,
];

exports.updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleWare,
];

exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("invalid User id format"),
  validatorMiddleWare,
];

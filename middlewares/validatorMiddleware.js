const { validationResult } = require("express-validator");
//@desc find validation error in req and wraps in array
const validatorMiddleware = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ error: err.array() });
  }
  next();
};

module.exports = validatorMiddleware;

const multer = require("multer");
const ApiError = require("../utils/apiError");

const multerOptions = () => {
  // MemoryStorage engine
  const multerStorage = multer.memoryStorage();

  // Filter only image allowed !Pdf
  const multerFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("Only image allowed", 400), false);
    }
  };
  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });

  return upload;
};

exports.uploadSingleImage = (filename) => multerOptions().single(filename);

exports.uploadMixOfImages = (array) => multerOptions().fields(array);

const asyncHandler = require("express-async-handler");
const sharp = require("sharp");

const User = require("../model/userModel");
const factory = require("./factoryHandler");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");

//upload user profileImage
exports.uploadUserImage = uploadSingleImage("profileImage");

// resize image
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `user-${Date.now()}.jpeg`;
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/users/${filename}`);

    // save image name into db
    req.body.profileImage = filename;
  }
  next();
});

//@desc   Get list of users
//@route  GET api/v1/users
//@access Private
exports.getUsers = factory.getAll(User);

//@decs   get specific User with id
//@route  GET ap1/v1/Users/:id
//@access Private
exports.getSpecificUser = factory.getOne(User);

//@desc    create User
//@route   POST api/v1/Users
//@access  private
exports.createUser = factory.createOne(User);

//@desc    update User /:id
//@route   PUT api/v1/users/:id
//@access  private
exports.updateUser = factory.updateOne(User);

//@desc    delete User /:id
//@route   DELETE api/v1/users/:id
//@access  private
exports.deleteUser = factory.deleteOne(User);

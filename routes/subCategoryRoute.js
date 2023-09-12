//mergeParams : Allow to access parameters i  n other routes
//ex : we want to access categoryId from categoryRoute
const router = require("express").Router({ mergeParams: true });
const {
  CreateSubCategory,
  getSubCategories,
  getSpecificSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../controllers/subCategoryCtrl");
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");

router
  .route("/")
  .post(createSubCategoryValidator, CreateSubCategory)
  .get(getSubCategories);
router
  .route("/:id")
  .get(getSubCategoryValidator, getSpecificSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory);
module.exports = router;

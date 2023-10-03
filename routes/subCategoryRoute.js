//mergeParams : Allow to access parameters in other routes
//ex : we want to access categoryId from categoryRoute
const router = require("express").Router({ mergeParams: true });
const {
  CreateSubCategory,
  getSubCategories,
  createFilterObj,
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
  .get(createFilterObj, getSubCategories);
router
  .route("/:id")
  .get(getSubCategoryValidator, getSpecificSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory);
module.exports = router;

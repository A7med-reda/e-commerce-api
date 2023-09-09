const router = require("express").Router();
const {
  getCategoryValidator,
  createCategoryValidator,
  deleteCategoryValidator,
  updateCategoryValidator,
} = require("../utils/validators/categoryValidator");
const {
  getCategory,
  createCategory,
  getSpecificCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryCtrl");

router.get("/", getCategory);
router.post("/", createCategoryValidator, createCategory);
router
  .route("/:id")
  .get(getCategoryValidator, getSpecificCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;

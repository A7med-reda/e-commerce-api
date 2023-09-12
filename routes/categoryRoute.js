const router = require("express").Router();
const {
  getCategoryValidator,
  createCategoryValidator,
  deleteCategoryValidator,
  updateCategoryValidator,
} = require("../utils/validators/categoryValidator");
const {
  getCategories,
  createCategory,
  getSpecificCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryCtrl");

const subCategoryRoute = require(`./subCategoryRoute`);
//nested routes
//api/v1/categories/categoryId/subcategories
router.use(`/:categoryId/subcategories`, subCategoryRoute);

router.get("/", getCategories);
router.post("/", createCategoryValidator, createCategory);
router
  .route("/:id")
  .get(getCategoryValidator, getSpecificCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;

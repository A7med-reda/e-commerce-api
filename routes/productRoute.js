const router = require("express").Router();
const {
  getProductValidator,
  createProductValidator,
  deleteProductValidator,
  updateProductValidator,
} = require("../utils/validators/productValidator");
const {
  getProducts,
  createProduct,
  getSpecificProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productCtrl");

router.get("/", getProducts);
router.post("/", createProductValidator, createProduct);
router
  .route("/:id")
  .get(getProductValidator, getSpecificProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

module.exports = router;

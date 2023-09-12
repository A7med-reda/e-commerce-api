const router = require("express").Router();
const {
  getBrandValidator,
  createBrandValidator,
  deleteBrandValidator,
  updateBrandValidator,
} = require("../utils/validators/brandValidator");
const {
  getBrands,
  createBrand,
  getSpecificBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandCtrl");

router.get("/", getBrands);
router.post("/", createBrandValidator, createBrand);
router
  .route("/:id")
  .get(getBrandValidator, getSpecificBrand)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router;

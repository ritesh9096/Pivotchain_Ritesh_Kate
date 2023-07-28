const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  getProductById,
} = require("../controller/productController");

router.post("/createProduct", createProduct);
router.get("/getProducts", getProducts);
router.get("/getProduct/:id", getProductById);
router.put("/updateP/:id", updateProduct);
router.delete("/deleteP/:id", deleteProduct);

module.exports = router;

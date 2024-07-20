const express = require("express");
const router = express.Router();
const { getProducts, getProduct, updateProduct, deleteProduct, createProduct } = require("../Controllers/product.controller");

router.get('/', getProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;

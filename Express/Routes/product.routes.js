const express = require("express")
const product = require("../Models/product.model")
const router = express.Router();
const{getProducts,getProduct,UpdateProduct,DeleteProduct,CreateProduct} = require("../Controllers/product.controller");


router.get('/',getProducts);
router.get("/:id",getProduct)
router.post("/",CreateProduct);
router.put("/:id",UpdateProduct);
router.delete("/:id",DeleteProduct);

module.exports = router;

const Product = require("../Models/product.model");
const mongoose = require("mongoose")
const getProducts = async (req, res) => {
    try {
        const user_id = req.user.id
        const products = await Product.find({user_id}).sort({createdAt:-1});
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const user_id = req.user.id;
        
        // Create a new product object with user_id included
        const productData = { ...req.body, user_id };
        
        // Create the product in the database
        const product = await Product.create(productData);
        
        // Respond with the created product
        res.status(201).json(product);
    } catch (error) {
        // Respond with an error message if something goes wrong
        res.status(400).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid product ID" });
        }

        // Attempt to find and delete the product
        const deletedProduct = await Product.findByIdAndDelete(id);
        
        // If the product was not found, return a 404 error
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Respond with a success message
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        // Catch any other errors and respond with a 500 status code
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};

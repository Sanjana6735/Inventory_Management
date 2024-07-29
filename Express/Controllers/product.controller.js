const Product = require("../Models/product.model");
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');

// Configure the email transporter
const configOptions = {
    host: "smtp.gmail.com", // Replace with your SMTP server's host
    port: 587,                // Port for STARTTLS
    secure: false,            // True for port 465, false for other ports
    tls: {
        rejectUnauthorized: true, // Ensure that the server's certificate is valid
        minVersion: "TLSv1.2"      // Enforce minimum TLS version
    },
    auth: {
        user: 'shabarishshabi.1234@gmail.com', // Your email address
        pass: 'ocezyflxfnldtyab'     // Your email password or app-specific password
    }
};

const transporter = nodemailer.createTransport(configOptions);

const sendLowStockEmail = (vendorEmail, productName, currentQuantity) => {
    const mailOptions = {
        from: 'Shabareshv6@gmail.com',
        to: vendorEmail,
        subject: `Low Stock Alert: ${productName}`,
        text: `The quantity for ${productName} is low. Current stock: ${currentQuantity}. Please restock soon.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

transporter.verify((error, success) => {
    if (error) {
        console.error('Error connecting to email server:', error);
    } else {
        console.log('Email server is ready to take messages');
    }
});


const LOW_STOCK_THRESHOLD = 10; // Set your low stock threshold

const getProducts = async (req, res) => {
    try {
        const user_id = req.user.id;
        const products = await Product.find({ user_id }).sort({ createdAt: -1 });
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
        const productData = { ...req.body, user_id };
        const product = await Product.create(productData);

        if (product.quantity < LOW_STOCK_THRESHOLD) {
            sendLowStockEmail(product.vendorEmail, product.name, product.quantity);
        }
        res.status(201).json(product);
    } catch (error) {
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

        if (updatedProduct.quantity < LOW_STOCK_THRESHOLD) {
            sendLowStockEmail(updatedProduct.vendorEmail, updatedProduct.name, updatedProduct.quantity);
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid product ID" });
        }

        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
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

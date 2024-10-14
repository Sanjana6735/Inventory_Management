require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const Product = require('./Models/product.model');
const { restart } = require('nodemon');
const product = require('./Models/product.model');
const productRoute = require("./Routes/product.routes")
const userRoute = require("./Routes/User.routes")
const app = express();
const salesRoutes = require("./Routes/sales.routes")
app.use(express.json());

app.use("/api/products",productRoute)
app.use("/api/sales", salesRoutes);
app.use("/api/user",userRoute)

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
    });
    
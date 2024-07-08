const { Timestamp } = require("mongodb")
const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required : true, 
        },
        quantity : 
        {
            type : Number,
            required : true,
        },
        price:
        {
            type : Number,
            required : true,
            default : 0,
        },
        image :
        {
            type : String,
            required : false,

        },
        category: { type: String, required: true },
    },
    {
        Timestamp : true,
    }
);

const product = mongoose.model("product",ProductSchema);


module.exports = product;


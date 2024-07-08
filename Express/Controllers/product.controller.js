const Product = require("../Models/product.model")

const getProducts = async (req,res)=>
    {
        try{
            const product = await   Product.find({})
            res.status(200).json(product);
        }
        catch(error){
            res.status(400).json({message: error.message})
        }
    }
    
const getProduct = 
    async (req,res)=>
        {
            try{
                const {id} = req.params;
                const product = await Product.findById(id);
                res.status(200).json(product)
            }
            catch(error)
            {
                res.status(400).json({message: error.message});
            }
        }
const CreateProduct = async (req, res) => {
    try {
        const pro = await Product.create(req.body);
        res.status(200).json(pro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


const UpdateProduct = async (req,res)=>
    {
        try{
            const {id}=req.params;
            const product = await Product.findByIdAndUpdate(id,req.body);
            if(!product)
                {
                    return res.status(404).json({message:"Product not found"})
                }
    
            const upadatedid = await Product.findById(id);
            res.status(200).json(upadatedid);
    
        }
        catch(error)
        {
            res.status(500).json({message:error.message});
        }
    }
const DeleteProduct = async (req,res)=>
    {
        try{
        const {id} = req.params;
        const product = await Product.findById(id);
        if(!product)
            {
                res.status(404).json("Not found");
            }
        await Product.findByIdAndDelete(id);
        res.status(200).json({message:"Product deleted successfully"});
        }
        catch(error)
        {
            res.status(500).json({message:error.message});
        }
    
    }



module.exports={
    getProduct,getProducts,CreateProduct,UpdateProduct,DeleteProduct
}


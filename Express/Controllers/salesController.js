const Product = require("../Models/product.model");
const Sale = require("../Models/sale");

const addSale = async (req, res) => {
  const { productId, quantity } = req.body;

  const session = await Product.startSession(); // Start session for transaction

  try {
    session.startTransaction(); // Start transaction

    const product = await Product.findById(productId).session(session); // Ensure query is part of transaction

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({ error: 'Not enough product quantity available' });
    }

    const sale = new Sale({
      product: productId,
      quantity,
      saleDate: new Date(),
    });

    await sale.save({ session }); // Save sale within transaction

    product.quantity -= quantity;
    await product.save({ session }); // Update product within transaction

    await session.commitTransaction(); // Commit the transaction
    session.endSession();

    res.status(201).json(sale);
  } catch (error) {
    await session.abortTransaction(); // Rollback in case of an error
    session.endSession();
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Something went wrong while processing the sale' });
  }
};

module.exports = {
  addSale,
};

const mongoose =require("mongoose")

const salesSchema = new mongoose.Schema(
    {
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  saleDate: { type: Date, default: Date.now }
    }
);

const Sale = mongoose.model('Sale', salesSchema);

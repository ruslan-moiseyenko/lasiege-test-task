import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }
});

const CategorySchema = new mongoose.Schema({
  name: String,
  description: String
});

const OrderSchema = new mongoose.Schema({
  customerName: String,
  address: String,
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number
    }
  ],
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now }
});

export const Product = mongoose.model("Product", ProductSchema);
export const Category = mongoose.model("Category", CategorySchema);
export const Order = mongoose.model("Order", OrderSchema);

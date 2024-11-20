import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { Product, Category, Order } from "./models/models.js";
import { dbUri } from "./settings/settings.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(dbUri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/api/products", async (req, res) => {
  try {
    const { category, sortBy, order } = req.query;
    let query = Product.find().populate("category");

    if (category && mongoose.Types.ObjectId.isValid(category)) {
      query = query.where("category", new mongoose.Types.ObjectId(category));
    }
    if (sortBy) {
      const sortOrder = order === "desc" ? -1 : 1;
      const sortConfig = {};
      sortConfig[sortBy] = sortOrder;
      query = query.sort(sortConfig);
    }

    const products = await query;
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");
  res.json(product);
});

app.get("/api/categories", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

app.post("/api/orders", async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json(order);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

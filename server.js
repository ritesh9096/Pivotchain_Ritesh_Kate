const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const MONGODB_URI = "mongodb://localhost:27017/mydatabase"; // Replace 'mydatabase' with your database name
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (error) => console.error("MongoDB connection error:", error));
db.once("open", () => console.log("Connected to MongoDB"));

// Product schema and model
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

// API endpoints
app.get("/getProducts", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ data: products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

app.post("/createProduct", async (req, res) => {
  try {
    const { title, description, productImage, price } = req.body;
    const newProduct = new Product({
      title,
      description,
      productImage,
      price,
    });
    await newProduct.save();
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
});

app.delete("/deleteProduct/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.findByIdAndRemove(productId);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
});

app.put("/updateProduct/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const { title, description, productImage, price } = req.body;
    await Product.findByIdAndUpdate(productId, {
      title,
      description,
      productImage,
      price,
    });
    res.json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

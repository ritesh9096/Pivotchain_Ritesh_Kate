const productModel = require("../models/productModel");

const createProduct = async (req, res) => {
  let { title, description, productImage, price } = req.body;

  try {
    if (!title) {
      return res.status(400).json({ message: "Product title required" });
    }
    let checkProduct = await productModel.find({ title: title });
    console.log(checkProduct);
    if (checkProduct.length !== 0) {
      return res
        .status(400)
        .json({ message: "Product title is already available" });
    }
    if (!description) {
      return res.status(400).json({ message: "description title required" });
    }
    if (!productImage) {
      return res.status(400).json({ message: "productImage title required" });
    }
    if (!price) {
      return res.status(400).json({ message: "price title required" });
    }

    let createProduct = await productModel.create(req.body);

    return res
      .status(201)
      .json({ message: "Product Created Successfully", data: createProduct });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const getAllProducts = await productModel.find({ isDeleted: false });
    if (!getAllProducts) {
      return res.status(404).json({ message: "No Products found" });
    }

    return res.status(200).json({ message: "Products", data: getAllProducts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const getProduct = await productModel.find({ _id: id, isDeleted: false });
    if (!getProduct) {
      return res.status(404).json({ message: "No Products found" });
    }

    return res.status(200).json({ getProduct });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, productImage, price } = req.body;
    if (!title || !description || !productImage || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { title, description, productImage, price },
      { new: true }
    );
    return res.json({
      message: "Product Updated Successfully",
      data: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await productModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json({
      message: "Product Deleted Successfully",
      data: deletedProduct,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};

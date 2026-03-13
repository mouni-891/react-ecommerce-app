import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get all products (with optional filters)
// @route   GET /api/products?category=men&subCategory=T-Shirts&featured=true
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const { category, subCategory, featured, newArrival, keyword } = req.query;

  const filter = {};

  if (category) {
    filter.category = {
      $regex: category,
      $options: "i",
    };
  }

  if (keyword) {
    filter.name = {
      $regex: keyword,
      $options: "i",
    };
  }

  if (subCategory) {
    filter.subCategory = {
      $regex: subCategory,
      $options: "i",
    };
  }

  if (featured === "true") {
    filter.isFeatured = true;
  }

  if (newArrival === "true") {
    filter.isNewArrival = true;
  }

  const products = await Product.find(filter);
  res.json(products);
});

// @desc    Get single product by MongoDB _id or slug
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let product;

  // Try MongoDB ObjectId first
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    product = await Product.findById(id);
  }

  // Fallback to slug
  if (!product) {
    product = await Product.findOne({ slug: id });
  }

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const newProduct = new Product(req.body);
  const createdProduct = await newProduct.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    Object.assign(product, req.body);
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

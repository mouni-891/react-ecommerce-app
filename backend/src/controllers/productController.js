import Product from "../models/productModel.js"; // Mongoose model
import asyncHandler from "express-async-handler";

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Get single product by ID or slug
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Try to find by _id first, if invalid, try slug
  let product;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    product = await Product.findById(id);
  }
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
  const newProduct = new Product({
    name: req.body.name,
    slug: req.body.slug,
    category: req.body.category,
    price: req.body.price,
    originalPrice: req.body.originalPrice || req.body.price,
    description: req.body.description || "",
    img: req.body.img,
    images: req.body.images || [],
    sizeOptions: req.body.sizeOptions || [],
    rating: req.body.rating || 0,
    reviews: req.body.reviews || 0,
    inStock: req.body.inStock !== undefined ? req.body.inStock : true,
    keyFeatures: req.body.keyFeatures || [],
  });

  const createdProduct = await newProduct.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    Object.assign(product, req.body); // update all fields from request
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
    await product.remove();
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

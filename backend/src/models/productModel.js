import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    id: { type: String },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    subCategory: { type: String },          
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    currency: { type: String, default: "INR" }, 
    description: { type: String },
    img: { type: String, required: true },
    images: [String],
    sizeOptions: [String],
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    inStock: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false }, 
    isNewArrival: { type: Boolean, default: false }, 
    keyFeatures: [String],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
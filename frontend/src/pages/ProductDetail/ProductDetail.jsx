import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css";
import { getImageUrl } from "@/api";

const StarRating = ({ rating }) => {
  return (
    <div className="stars-display">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= Math.round(rating) ? "filled" : ""}`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/${id}`);
        const data = res.data;

        setProduct(data);
        setSelectedImage(data.thumbnail);

        const relatedRes = await axios.get(
          `${API_URL}/api/products?category=${data.category}`
        );
        setRelatedProducts(
          relatedRes.data.filter((item) => item._id !== data._id)
        );
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <h2 className="loading">Loading...</h2>;

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cartItems.find((item) => item._id === product._id);

    const updatedCart = existing
      ? cartItems.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + qty }
            : item
        )
      : [...cartItems, { ...product, qty }];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Product added to cart!");
  };

  const images =
    product.images?.length > 0 ? product.images : [product.thumbnail];

  return (
    <div className="product-detail-page">

      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <a href="/">Home</a>
        <span>›</span>
        <a href={`/category/${product.category}`}>{product.category}</a>
        <span>›</span>
        <span style={{ color: "var(--text-primary)" }}>{product.name}</span>
      </div>

      {/* MAIN CARD */}
      <div className="product-detail-container">

        {/* LEFT: IMAGES */}
        <div className="product-images">
          <div className="main-image-wrapper">
            {discount && (
              <div className="image-badge">{discount}% OFF</div>
            )}
            <img
              src={getImageUrl(selectedImage)}
              alt={product.name}
              className="main-image"
            />
          </div>

          <div className="thumbnail-row">
            {images.map((img, index) => (
              <img
                key={index}
                src={getImageUrl(img)}
                alt={`View ${index + 1}`}
                className={selectedImage === img ? "active-thumb" : ""}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: INFO */}
        <div className="product-info">
          <p className="product-category-tag">{product.category}</p>

          <h2 className="product-name">{product.name}</h2>
          <p className="product-brand">Brand: {product.brand || "Generic"}</p>

          {/* RATING */}
          <div className="product-rating">
            <StarRating rating={product.rating} />
            <span className="rating-score">{product.rating}</span>
            <div className="rating-divider" />
            <span className="rating-count">{product.reviews} reviews</span>
          </div>

          <div className="info-divider" />

          {/* PRICE */}
          <div className="product-price">
            <span className="current-price">₹{product.price}</span>
            {product.originalPrice && (
              <>
                <span className="original-price">₹{product.originalPrice}</span>
                <span className="discount-pill">{discount}% OFF</span>
              </>
            )}
          </div>
          <p className="tax-note">Inclusive of all taxes</p>

          {/* STOCK */}
          <div className="stock-row">
            <span className={`stock-dot ${product.inStock ? "green" : "red"}`} />
            <p className={`stock ${product.inStock ? "in-stock" : "out-of-stock"}`}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </p>
          </div>

          <div className="info-divider" />

          {/* QUANTITY */}
          <div className="quantity-section">
            <span className="quantity-label">Quantity</span>
            <div className="quantity-controls">
              <button
                onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                disabled={qty <= 1}
              >
                −
              </button>
              <span className="qty-value">{qty}</span>
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="product-actions">
            <button
              className="add-to-cart"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              🛒 Add to Cart
            </button>
            <button
              className="buy-now"
              disabled={!product.inStock}
            >
              ⚡ Buy Now
            </button>
          </div>

          {/* DELIVERY BADGES */}
          <div className="delivery-info">
            <div className="delivery-badge">
              <span className="badge-icon">🚚</span> Free Delivery
            </div>
            <div className="delivery-badge">
              <span className="badge-icon">↩️</span> 7-Day Returns
            </div>
            <div className="delivery-badge">
              <span className="badge-icon">🔒</span> Secure Payment
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="info-divider" />
          <div className="product-description">
            <h3>Description</h3>
            <p>
              {product.description ||
                "High quality product with premium durability and trusted performance."}
            </p>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <div className="related-section">
          <div className="related-header">
            <h2>Related Products</h2>
            <a href={`/category/${product.category}`}>View all →</a>
          </div>
          <div className="related-grid">
            {relatedProducts.slice(0, 4).map((item) => (
              <div
                key={item._id}
                className="related-card"
                onClick={() => navigate(`/product/${item._id}`)}
              >
                <div className="related-card-image">
                  <img src={getImageUrl(item.thumbnail)} alt={item.name} />
                </div>
                <div className="related-card-body">
                  <h4>{item.name}</h4>
                  <p className="related-card-price">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
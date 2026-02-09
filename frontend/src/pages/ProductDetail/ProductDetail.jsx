import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductData from "@/data/ProductData";
import { useCart } from "@/context/CartContext.jsx";
import { useWishlist } from "@/context/WishlistContext.jsx";
import { useAuth } from "@/auth/AuthContext";
import ProductFeatures from "./ProductFeatures";
import "./ProductDetail.css";

function ProductDetail() {
  const { slugOrId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [activeImage, setActiveImage] = useState(null);

  // Scroll to top on mount or product change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slugOrId]);

  const product = ProductData.find(
    (item) => item.slug === slugOrId || item.id === slugOrId
  );

  // Set default size and image
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizeOptions?.[0] || "");
      setActiveImage(product.img);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="Product-not-found">
        <h2>Product not found</h2>
        <button onClick={() => navigate("/")}>Go to Home</button>
      </div>
    );
  }

  // Related products (up to 4)
  const relatedProducts = ProductData.filter(
    (item) => item.category === product.category && item.id !== product.id
  ).slice(0, 4);

  const handleQuantityChange = (type) => {
    setQuantity((prev) =>
      type === "increase" ? prev + 1 : prev > 1 ? prev - 1 : prev
    );
  };

  // Prepare cart item
  const prepareCartItem = () => ({
    ...product,
    quantity,
    selectedSize: selectedSize || null,
  });

  // Unified Add to Cart / Go to Cart
  const handleAddToCart = () => {
    if (!user) return navigate("/login");

    if (product.sizeOptions?.length > 0 && !selectedSize) {
      return alert("Please select a size");
    }

    if (isInCart(product.id)) {
      return navigate("/cart"); // Go to cart if already added
    }

    addToCart(prepareCartItem());
  };

  // Buy Now -> Add to Cart and go to cart
  const handleBuyNow = () => {
    if (!user) return navigate("/login");

    if (product.sizeOptions?.length > 0 && !selectedSize) {
      return alert("Please select a size");
    }

    if (!isInCart(product.id)) addToCart(prepareCartItem());
    navigate("/cart");
  };

  const getDiscountPercentage = () => {
    if (product.originalPrice) {
      return Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      );
    }
    return null;
  };

  return (
    <div className="Product-detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span onClick={() => navigate("/")}>Home</span>
        <span> / </span>
        <span
          onClick={() => navigate(`/category/${product.category}`)}
        >
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </span>
        <span> / </span>
        <span>{product.name}</span>
      </div>

      {/* Main Container */}
      <div className="Product-detail-container">
        {/* Left Column: Images */}
        <div className="Product-images">
          <div className="Product-image-sticky">
            <img src={activeImage || product.img} alt={product.name} />

            {product.images?.length > 0 && (
              <div className="thumbnail-images">
                {product.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`thumb-${idx}`}
                    className={activeImage === img ? "active" : ""}
                    onClick={() => setActiveImage(img)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Info */}
        <div className="Product-info">
          <h1 className="Product-name">{product.name}</h1>

          {/* Rating */}
          <div className="Product-rating">
            <span className="rating-value">{product.rating} ⭐</span>
            <span className="rating-reviews">({product.reviews} reviews)</span>
          </div>

          {/* Price & Discount */}
          <div className="Product-pricing">
            <span className="current-price">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <>
                <span className="original-price">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                <span className="discount">{getDiscountPercentage()}% OFF</span>
              </>
            )}
          </div>

          {/* Stock */}
          <div
            className={`stock-status ${
              product.inStock ? "in-stock" : "out-of-stock"
            }`}
          >
            {product.inStock ? "✓ In Stock" : "✗ Out of Stock"}
          </div>

          {/* Size Selection */}
          {product.sizeOptions?.length > 0 && (
            <div className="size-selection">
              <label>Select Size:</label>
              <div className="size-options">
                {product.sizeOptions.map((size) => (
                  <button
                    key={size}
                    className={`size-button ${
                      selectedSize === size ? "selected" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="quantity-selection">
            <label>Quantity:</label>
            <div className="quantity-controls">
              <button
                className="qty-btn"
                onClick={() => handleQuantityChange("decrease")}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="qty-display">{quantity}</span>
              <button
                className="qty-btn"
                onClick={() => handleQuantityChange("increase")}
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="Product-actions">
            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {isInCart(product.id) ? "Go to Cart" : "Add to Cart"}
            </button>

            <button
              className="buy-now-btn"
              onClick={handleBuyNow}
              disabled={!product.inStock}
            >
              Buy Now
            </button>

            <button
              className="wishlist-btn-detail"
              onClick={() => {
                if (!user) return navigate("/login");
                toggleWishlist(product);
              }}
            >
              <img
                src={
                  isInWishlist(product.id)
                    ? "/wishlist/favorite2.png"
                    : "/wishlist/favorite.png"
                }
                alt="wishlist"
              />
            </button>
          </div>

          {/* Description */}
          <div className="Product-description">
            <h3>Product Description</h3>
            <p>
              {product.description ||
                `${product.name} - High-quality product with excellent features and durability.`}
            </p>
          </div>

          {/* Key Features */}
          <div className="Product-features">
            <h3>Key Features</h3>
            <ul>
              {(product.keyFeatures?.length
                ? product.keyFeatures
                : ProductFeatures[product.category]
              )?.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="related-Products-section">
          <h2>You May Also Like</h2>
          <div className="related-Products-grid">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                className="related-Product-card"
                onClick={() => {
                  navigate(`/product/${item.slug}`);
                  window.scrollTo(0, 0);
                }}
              >
                <img src={item.img} alt={item.name} />
                <h4>{item.name}</h4>
                <p className="related-price">₹{item.price.toLocaleString()}</p>
                <p className="related-rating">
                  {item.rating} ⭐ ({item.reviews})
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;

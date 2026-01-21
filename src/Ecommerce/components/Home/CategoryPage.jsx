import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductData from "@data/ProductData";
import { useCart } from "@context/CartContext";
import { useWishlist } from "@context/WishlistContext";
import { useAuth } from "@auth/AuthContext";
import { useEffect, useState } from "react";
import "./CategoryPage.css";

function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  const filteredProducts = ProductData.filter(
    (item) => item.category === category,
  );

  const handleAddToCart = (product) => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (isInCart(product.id)) {
      navigate("/cart");
      return;
    }

    // For clothing items with size options, show size selector
    if (product.sizeOptions && product.sizeOptions.length > 0) {
      setSelectedProduct(product);
      setSelectedSize(product.sizeOptions[0]);
      setShowSizeModal(true);
    } else {
      addToCart({ ...product, quantity: 1 });
    }
  };

  const confirmAddToCart = () => {
    if (selectedProduct && selectedSize) {
      addToCart({
        ...selectedProduct,
        quantity: 1,
        selectedSize: selectedSize,
      });
      setShowSizeModal(false);
      setSelectedProduct(null);
      setSelectedSize("");
    }
  };

  return (
    <div className="category-page">
      <h1>{category?.toUpperCase()}</h1>

      <div className="category-products-grid">
        {filteredProducts.map((item) => (
          <div key={item.id} className="category-product-card">
            <img
              src={item.img}
              alt={item.name}
              className="category-product-img"
              onClick={() => navigate(`/product/${item.id}`)}
            />

            <div className="category-product-content">
              <h4 className="category-product-name">{item.name}</h4>
              <p className="category-product-price">
                ₹{item.price.toLocaleString()}
              </p>
              <div className="category-product-rating">
                {item.rating} ({item.reviews})
              </div>
            </div>

            <div className="category-product-actions">
              <button
                className="category-cart-button"
                disabled={!item.inStock}
                onClick={() => handleAddToCart(item)}
              >
                {!item.inStock
                  ? "Out of Stock"
                  : isInCart(item.id)
                    ? "Go to Cart"
                    : "Add to Cart"}
              </button>

              <button
                className="category-wishlist-button"
                onClick={() => {
                  if (!user) {
                    navigate("/login");
                    return;
                  }
                  toggleWishlist(item);
                }}
              >
                <img
                  src={
                    isInWishlist(item.id)
                      ? "/wishlist/favorite2.png"
                      : "/wishlist/favorite.png"
                  }
                  alt="wishlist"
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showSizeModal && selectedProduct && (
        <div
          className="size-modal-overlay"
          onClick={() => setShowSizeModal(false)}
        >
          <div className="size-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Select Size</h3>
            <p className="modal-product-name">{selectedProduct.name}</p>

            <div className="modal-size-options">
              {selectedProduct.sizeOptions.map((size) => (
                <button
                  key={size}
                  className={`modal-size-btn ${selectedSize === size ? "selected" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="modal-actions">
              <button
                className="modal-cancel-btn"
                onClick={() => setShowSizeModal(false)}
              >
                Cancel
              </button>
              <button className="modal-confirm-btn" onClick={confirmAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryPage;

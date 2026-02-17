import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductData from "@/data/ProductData";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/auth/AuthContext";
import "./CategoryPage.css";

function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [addedToCart, setAddedToCart] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [category]);

  const filteredProducts = ProductData.filter(
    (item) => item.category === category,
  );

  const handleAddToCart = (itemId) => {
    // Add to cart logic here
    setAddedToCart(prev => ({ ...prev, [itemId]: true }));
    
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [itemId]: false }));
    }, 2000);
  };

  const handleWishlistClick = (e, item) => {
    e.stopPropagation();
    if (!user) {
      navigate("/login");
      return;
    }
    toggleWishlist(item);
  };

  if (filteredProducts.length === 0) {
    return (
      <div className="category-page">
        <h1>{category?.toUpperCase()}</h1>
        <div className="category-empty-state">
          <h2>No Products Found</h2>
          <p>We couldn't find any products in this category.</p>
          <button 
            className="category-cart-button"
            onClick={() => navigate('/')}
            style={{ maxWidth: '200px', margin: '0 auto' }}
          >
            Browse All Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="category-page">
      <h1>{category?.toUpperCase()}</h1>

      <div className="category-products-grid">
        {filteredProducts.map((item) => (
          <div key={item.id} className="category-product-card">
            <div 
              className="product-img-wrapper"
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <img
                src={item.img}
                alt={item.name}
                className="category-product-img"
                loading="lazy"
              />

              <button
                className="category-wishlist-button"
                onClick={(e) => handleWishlistClick(e, item)}
                aria-label={isInWishlist(item.id) ? "Remove from wishlist" : "Add to wishlist"}
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

              {item.discount && (
                <div className="quick-view-badge">
                  {item.discount}% OFF
                </div>
              )}
            </div>

            <div className="category-product-content">
              <h4 
                className="category-product-name"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                {item.name}
              </h4>
              <p className="category-product-price">
                ₹{item.price.toLocaleString()}
              </p>
              <div className="category-product-rating">
                {item.rating} ({item.reviews})
              </div>
            </div>

            <div className="category-product-actions">
              <button
                className={`category-cart-button ${addedToCart[item.id] ? 'added' : ''}`}
                onClick={() => handleAddToCart(item.id)}
              >
                {addedToCart[item.id] ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
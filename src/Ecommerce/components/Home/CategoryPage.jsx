import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductData from "@data/ProductData";
import { useWishlist } from "@context/WishlistContext";
import { useAuth } from "@auth/AuthContext";
import "./CategoryPage.css";

function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  const filteredProducts = ProductData.filter(
    (item) => item.category === category,
  );

  return (
    <div className="category-page">
      <h1>{category?.toUpperCase()}</h1>

      <div className="category-products-grid">
        {filteredProducts.map((item) => (
          <div key={item.id} className="category-product-card">
            <div className="product-img-wrapper">
              <img
                src={item.img}
                alt={item.name}
                className="category-product-img"
                onClick={() => navigate(`/product/${item.id}`)}
              />

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

            <div className="category-product-content">
              <h4 className="category-product-name">{item.name}</h4>
              <p className="category-product-price">
                ₹{item.price.toLocaleString()}
              </p>
              <div className="category-product-rating">
                {item.rating} ({item.reviews})
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;

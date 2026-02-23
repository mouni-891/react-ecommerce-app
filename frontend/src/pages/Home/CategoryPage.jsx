import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import "./CategoryPage.css";

function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_URL}/api/products?category=${category}`);

        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();

        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, API_URL]);

  if (loading) return <h2 className="loading">Loading...</h2>;

  if (error)
    return (
      <div className="category-page">
        <h2>Error: {error}</h2>
      </div>
    );

  if (products.length === 0) {
    return (
      <div className="category-page">
        <h1>{category?.toUpperCase()}</h1>
        <div className="category-empty-state">
          <h2>No Products Found</h2>
          <button
            className="category-cart-button"
            onClick={() => navigate("/")}
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
        {products.map((item) => (
          <div key={item._id} className="category-product-card">
            <div
              className="product-img-wrapper"
              onClick={() => navigate(`/product/${item._id}`)}
            >
              <img
                className="category-product-img"
                src={`${API_URL}${item.img}`}
                alt={item.name}
                onError={(e) => (e.target.src = "/placeholder.jpg")}
              />

              <button
                className={`category-wishlist-button ${
                  isInWishlist(item._id) ? "active" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  const alreadyInWishlist = isInWishlist(item._id);
                  toggleWishlist(item);
                  if (alreadyInWishlist) {
                    toast("Removed from wishlist ❌");
                  } else {
                    toast.success("Added to wishlist ❤️");
                  }
                }}
              >
                {isInWishlist(item._id) ? (
                  <FaHeart color="red" />
                ) : (
                  <FaRegHeart />
                )}
              </button>
            </div>

            <div className="category-product-content">
              <h4 className="category-product-name">{item.name}</h4>
              <p className="category-product-price">
                ₹{item.price?.toLocaleString()}
              </p>
              {item.rating && (
                <div className="category-product-rating">{item.rating}</div>
              )}

              <div className="category-product-actions">
                <button
                  className="category-cart-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isInCart(item._id)) {
                      navigate("/cart");
                    } else {
                      addToCart(item);
                    }
                  }}
                >
                  {isInCart(item._id) ? "Go To Cart" : "Add To Cart"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;

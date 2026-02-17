import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/auth/AuthContext";
import "./CategoryPage.css";

function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [addedToCart, setAddedToCart] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Fetch all products from backend
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, [category]);

  // Filter products by category dynamically
  const filteredProducts = products.filter(item => item.category === category);

  const handleAddToCart = (itemId) => {
    setAddedToCart(prev => ({ ...prev, [itemId]: true }));
    setTimeout(() => setAddedToCart(prev => ({ ...prev, [itemId]: false })), 2000);
  };

  const handleWishlistClick = (e, item) => {
    e.stopPropagation();
    if (!user) { navigate("/login"); return; }
    toggleWishlist(item);
  };

  if (filteredProducts.length === 0) {
    return (
      <div className="category-page">
        <h1>{category?.toUpperCase()}</h1>
        <div className="category-empty-state">
          <h2>No Products Found</h2>
          <button className="category-cart-button" onClick={() => navigate('/')}>
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
          <div key={item._id} className="category-product-card">
            <div onClick={() => navigate(`/product/${item._id}`)}>
              <img src={item.img} alt={item.name} />
            </div>
            <h4 onClick={() => navigate(`/product/${item._id}`)}>{item.name}</h4>
            <p>₹{item.price.toLocaleString()}</p>
            <button onClick={() => handleAddToCart(item._id)}>
              {addedToCart[item._id] ? "✓ Added to Cart" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;

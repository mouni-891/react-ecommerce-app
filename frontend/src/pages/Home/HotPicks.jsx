import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HotPicks.css";

const HotPicks = () => {
  const navigate = useNavigate();
  const [clothing, setClothing] = useState([]);
  const [electronics, setElectronics] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const [clothingRes, electronicsRes] = await Promise.all([
          fetch(`${API_URL}/api/products?category=clothing&featured=true`),
          fetch(`${API_URL}/api/products?category=electronics&featured=true`),
        ]);

        const clothingData = await clothingRes.json();
        const electronicsData = await electronicsRes.json();

        setClothing(clothingData.slice(0, 4));
        setElectronics(electronicsData.slice(0, 4));
      } catch (err) {
        console.error("HotPicks fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, [API_URL]);

  if (loading) return <h2>Loading Hot Picks...</h2>;

  return (
    <div className="hot-picks-container">
      <div className="categories-wrapper">
        <div className="category-card">
          <h2 className="category-title">Clothing Hot Picks</h2>
          <div className="products-grid">
            {clothing.map((item) => (
              <div
                key={item._id}
                className="product-card"
                onClick={() => navigate(`/product/${item._id}`)}
              >
                <img src={`${API_URL}${item.img}`} alt={item.name} />
                <p className="product-name">{item.name}</p>
                <span className="product-offer">
                  ₹{item.price?.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="category-card">
          <h2 className="category-title">Electronics Hot Picks</h2>
          <div className="products-grid">
            {electronics.map((item) => (
              <div
                key={item._id}
                className="product-card"
                onClick={() => navigate(`/product/${item._id}`)}
              >
                <img src={`${API_URL}${item.img}`} alt={item.name} />
                <p className="product-name">{item.name}</p>
                <span className="product-offer">
                  ₹{item.price?.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotPicks;

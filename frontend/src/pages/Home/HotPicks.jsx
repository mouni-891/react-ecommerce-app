import React from "react";
import { useNavigate } from "react-router-dom";
import ProductData from "@/data/ProductData";
import "./HotPicks.css";

const HotPicks = () => {
  const navigate = useNavigate();

  const clothing = ProductData.filter(
    (item) => item.category === "clothing" && item.isFeatured
  );

  const electronics = ProductData.filter(
    (item) => item.category === "electronics" && item.isFeatured
  );

  return (
    <div className="hot-picks-container">
      <div className="categories-wrapper">

        {/* Clothing */}
        <div className="category-card">
          <h2 className="category-title">Clothing Hot Picks</h2>
          <div className="products-grid">
            {clothing.map((item) => (
              <div
                key={item.id}
                className="product-card"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img src={item.img} alt={item.name} />
                <p className="product-name">{item.name}</p>
              </div>
            ))}
          </div>
          <button
            className="explore-btn"
            onClick={() => navigate("/category/clothing")}
          >
            Explore More →
          </button>
        </div>

        {/* Electronics */}
        <div className="category-card">
          <h2 className="category-title">Electronics Hot Picks</h2>
          <div className="products-grid">
            {electronics.map((item) => (
              <div
                key={item.id}
                className="product-card"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <div className="product-image-wrapper">
                <img src={item.img} alt={item.name} />
                <p className="product-name">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            className="explore-btn"
            onClick={() => navigate("/category/electronics")}
          >
            Explore More →
          </button>
        </div>

      </div>
    </div>
  );
};

export default HotPicks;

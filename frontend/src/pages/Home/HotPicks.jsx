import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HotPicks.css";

const HotPicks = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  const clothing = products.filter(item => item.category === "clothing" && item.isFeatured);
  const electronics = products.filter(item => item.category === "electronics" && item.isFeatured);

  return (
    <div className="hot-picks-container">
      {/* Clothing Hot Picks */}
      <div className="category-card">
        <h2>Clothing Hot Picks</h2>
        <div className="products-grid">
          {clothing.map(item => (
            <div key={item._id} onClick={() => navigate(`/product/${item._id}`)}>
              <img src={item.img} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Electronics Hot Picks */}
      <div className="category-card">
        <h2>Electronics Hot Picks</h2>
        <div className="products-grid">
          {electronics.map(item => (
            <div key={item._id} onClick={() => navigate(`/product/${item._id}`)}>
              <img src={item.img} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotPicks;

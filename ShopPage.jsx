// ShopPage.jsx
import React from "react";
import "./ShopPage.css";

function ShopPage() {
  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          <h2>ShopMate</h2>
        </div>

        <div className="header-center">
          <input placeholder="Search products..." />
        </div>

        <div className="header-right">
          <span>Log In</span>
          <div className="cart">
            <span role="img" aria-label="cart">🛒</span>
            <sup>0</sup>
          </div>
        </div>
      </header>

      <section className="filters">
        <div className="filter-item">
          <span>Category:</span>
          <select>
            <option>All Categories</option>
          </select>
        </div>

        <div className="filter-item">
          <span>Sort by:</span>
          <select>
            <option>Most Popular</option>
          </select>
        </div>
      </section>

      <main className="products">
        {/* Card 1 */}
        <article className="product-card gradient-1">
          <div className="thumb">
            <span className="badge">-34%</span>
            <img src="/images/headphones.png" alt="Premium Wireless Headphones" />
          </div>
          <div className="content">
            <h3>Premium Wireless Headphones</h3>
            <div className="rating">
              ⭐⭐⭐⭐⭐ <span>(328)</span>
            </div>
            <div className="price-row">
              <span className="price">₹99</span>
              <span className="old-price">₹149</span>
            </div>
            <button>Add to Cart</button>
          </div>
        </article>

        {/* Card 2 */}
        <article className="product-card gradient-2">
          <div className="thumb">
            <span className="badge">-38%</span>
            <img src="/images/watch.png" alt="Smart Watch Pro" />
          </div>
          <div className="content">
            <h3>Smart Watch Pro</h3>
            <div className="rating">
              ⭐⭐⭐⭐⭐ <span>(512)</span>
            </div>
            <div className="price-row">
              <span className="price">₹249</span>
              <span className="old-price">₹399</span>
            </div>
            <button>Add to Cart</button>
          </div>
        </article>

        {/* Add more cards with gradient-3, gradient-1, ... */}
      </main>
    </div>
  );
}

export default ShopPage;

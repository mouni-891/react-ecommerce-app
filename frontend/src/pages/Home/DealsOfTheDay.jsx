import React, { useEffect, useState } from "react";
import "./DealsOfTheDay.css";

const deals = [
  {
    id: 1,
    name: "Wireless Headphones",
    brand: "Redragon",
    price: 2199,
    oldPrice: 2999,
    rating: 4.3,
    reviews: 1284,
    image: "/hotPicks-images/electronics/headPhones.png",
    tag: "Bestseller",
  },
  {
    id: 2,
    name: "Men Casual Shirt",
    brand: "FabIndia",
    price: 999,
    oldPrice: 1299,
    rating: 4.1,
    reviews: 876,
    image: "/Categories/men/menCasualBrownShirt.png",
    tag: "Top Rated",
  },
  {
    id: 3,
    name: "Smart LED TV 43-inch",
    brand: "VU Televisions",
    price: 21999,
    oldPrice: 28999,
    rating: 4.5,
    reviews: 3421,
    image: "/hotPicks-images/electronics/smartTV.png",
    tag: "Deal of the Day",
  },
  {
   id: "4",
    name: "Wedding Sherwani",
    image: "/Categories/men/sherwani.png",
    brand: "KISAH",
    price: 6999,
    oldPrice: 8999,
    rating: 4.9,
    reviews: 457,
    tag: "Bestseller",
  },
];

function pad(n) {
  return String(n).padStart(2, "0");
}

function StarRating({ rating }) {
  return (
    <div className="star-rating">
      <span className="rating-badge">
        {rating} ★
      </span>
      <span className="rating-count">({(rating * 1000).toLocaleString("en-IN")})</span>
    </div>
  );
}

function DealsOfTheDay({ onAddToCart, onToggleWishlist, wishlist = [] }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 58, seconds: 43 });
  const [addedToCart, setAddedToCart] = useState({});

  useEffect(() => {
    const endTime = Date.now() + (23 * 3600 + 58 * 60 + 43) * 1000;
    const timer = setInterval(() => {
      const dist = endTime - Date.now();
      if (dist <= 0) { clearInterval(timer); return; }
      setTimeLeft({
        hours: Math.floor((dist / (1000 * 3600)) % 24),
        minutes: Math.floor((dist / (1000 * 60)) % 60),
        seconds: Math.floor((dist / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = (item) => {
    setAddedToCart((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => setAddedToCart((prev) => ({ ...prev, [item.id]: false })), 1800);
    if (onAddToCart) onAddToCart(item);
  };

  return (
    <section className="deals-section">
      {/* Section Header */}
      <div className="deals-header">
        <div className="deals-title-group">
          <div className="deals-title">
            <span className="fire-icon">🔥</span>
            <h2>Deals of the Day</h2>
          </div>
          <p className="deals-subtitle">Hurry! Limited time offers</p>
        </div>

        <div className="deals-header-right">
          <div className="countdown-wrapper">
            <span className="countdown-label">Ends in</span>
            <div className="countdown">
              {[
                { val: pad(timeLeft.hours), unit: "HRS" },
                { val: pad(timeLeft.minutes), unit: "MIN" },
                { val: pad(timeLeft.seconds), unit: "SEC" },
              ].map(({ val, unit }, i) => (
                <React.Fragment key={unit}>
                  <div className="countdown-block">
                    <span className="countdown-value">{val}</span>
                    <span className="countdown-unit">{unit}</span>
                  </div>
                  {i < 2 && <span className="countdown-colon">:</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
          <button className="view-all-btn">View All Deals →</button>
        </div>
      </div>

      {/* Divider */}
      <div className="section-divider" />

      {/* Cards Grid */}
      <div className="deals-grid">
        {deals.map((item) => {
          const discount = Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100);
          const isWishlisted = wishlist.includes(item.id);
          const justAdded = addedToCart[item.id];

          return (
            <div key={item.id} className="deal-card">
              {/* Top badges */}
              <div className="card-top-row">
                <span className="discount-badge">-{discount}% OFF</span>
                <button
                  className={`deals-wishlist-btn ${isWishlisted ? "wishlisted" : ""}`}
                  onClick={() => onToggleWishlist && onToggleWishlist(item.id)}
                  aria-label="Wishlist"
                >
                  {isWishlisted ? "❤️" : "♡"}
                </button>
              </div>

              {/* Tag */}
              {item.tag && <span className="product-tag">{item.tag}</span>}

              {/* Image */}
              <div className="card-image-wrapper">
                <img src={item.image} alt={item.name} className="card-image" />
              </div>

              {/* Info */}
              <div className="card-info">
                <p className="product-brand">{item.brand}</p>
                <h4 className="product-name">{item.name}</h4>

                <StarRating rating={item.rating} />

                <div className="price-row">
                  <span className="current-price">₹{item.price.toLocaleString("en-IN")}</span>
                  <span className="old-price">₹{item.oldPrice.toLocaleString("en-IN")}</span>
                  <span className="discount-text">{discount}% off</span>
                </div>

                <p className="free-delivery">✔ Free Delivery</p>

                <div className="card-actions">
                  <button
                    className={`add-to-cart-btn ${justAdded ? "added" : ""}`}
                    onClick={() => handleAddToCart(item)}
                  >
                    {justAdded ? "✓ Added to Cart" : "🛒 Add to Cart"}
                  </button>
                  <button className="buy-now-btn">Buy Now</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default DealsOfTheDay;
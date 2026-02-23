import React, { useEffect, useState } from "react";
import "./DealsOfTheDay.css";

function pad(n) {
  return String(n).padStart(2, "0");
}

function StarRating({ rating, reviews }) {
  return (
    <div className="star-rating">
      <span className="rating-badge">
        {rating} ★
      </span>
      <span className="rating-count">
        ({reviews?.toLocaleString("en-IN")})
      </span>
    </div>
  );
}

function DealsOfTheDay({ onAddToCart, onToggleWishlist, wishlist = [] }) {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState({});
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  // 🔥 Fetch products from backend
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();

        // Optional: filter only deal products
        const dealProducts = data.filter(
          (item) => item.oldPrice && item.price < item.oldPrice
        );

        setDeals(dealProducts);
      } catch (error) {
        console.error("Error fetching deals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  // ⏳ Countdown Timer
  useEffect(() => {
    const endTime = Date.now() + (23 * 3600 + 59 * 60 + 59) * 1000;

    const timer = setInterval(() => {
      const dist = endTime - Date.now();

      if (dist <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        hours: Math.floor((dist / (1000 * 3600)) % 24),
        minutes: Math.floor((dist / (1000 * 60)) % 60),
        seconds: Math.floor((dist / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 🛒 Add to cart
  const handleAddToCart = (item) => {
    setAddedToCart((prev) => ({ ...prev, [item._id]: true }));

    setTimeout(() => {
      setAddedToCart((prev) => ({ ...prev, [item._id]: false }));
    }, 1800);

    if (onAddToCart) onAddToCart(item);
  };

  if (loading) {
    return <p style={{ padding: "40px", textAlign: "center" }}>Loading deals...</p>;
  }

  return (
    <section className="deals-section">
      {/* Header */}
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

      <div className="section-divider" />

      {/* Products Grid */}
      <div className="deals-grid">
        {deals.map((item) => {
          const discount = Math.round(
            ((item.oldPrice - item.price) / item.oldPrice) * 100
          );

          const isWishlisted = wishlist.some(
            (w) => w._id === item._id
          );

          const justAdded = addedToCart[item._id];

          return (
            <div key={item._id} className="deal-card">
              {/* Top row */}
              <div className="card-top-row">
                <span className="discount-badge">
                  -{discount}% OFF
                </span>

                <button
                  className={`deals-wishlist-btn ${
                    isWishlisted ? "wishlisted" : ""
                  }`}
                  onClick={() =>
                    onToggleWishlist && onToggleWishlist(item)
                  }
                >
                  {isWishlisted ? "❤️" : "🤍"}
                </button>
              </div>

              {/* Tag */}
              {item.tag && (
                <span className="product-tag">{item.tag}</span>
              )}

              {/* Image */}
              <div className="card-image-wrapper">
                <img
                  src={item.image}
                  alt={item.name}
                  className="card-image"
                />
              </div>

              {/* Info */}
              <div className="card-info">
                <p className="product-brand">{item.brand}</p>
                <h4 className="product-name">{item.name}</h4>

                <StarRating
                  rating={item.rating}
                  reviews={item.reviews}
                />

                <div className="price-row">
                  <span className="current-price">
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>

                  <span className="old-price">
                    ₹{item.oldPrice.toLocaleString("en-IN")}
                  </span>

                  <span className="discount-text">
                    {discount}% off
                  </span>
                </div>

                <p className="free-delivery">
                  ✔ Free Delivery
                </p>

                <div className="card-actions">
                  <button
                    className={`add-to-cart-btn ${
                      justAdded ? "added" : ""
                    }`}
                    onClick={() => handleAddToCart(item)}
                  >
                    {justAdded
                      ? "✓ Added to Cart"
                      : "🛒 Add to Cart"}
                  </button>

                  <button className="buy-now-btn">
                    Buy Now
                  </button>
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
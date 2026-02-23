import { useState } from "react";
import { Heart, ShoppingCart, Truck, Star } from "lucide-react";
import "./ProductCard.css";

const ProductCard = ({
  theme = "dark",
  badge = "",
  brand = "",
  name = "",
  price = "",
  originalPrice = "",
  discount = "",
  rating = 0,
  reviewCount = "",
  inStock = true,
  delivery = "",
  image = null,
  swatches = [],
  onAddToCart = () => {},
  onBuyNow = () => {},
}) => {
  const [wishlisted, setWishlisted] = useState(false);
  const [activeSwatch, setActiveSwatch] = useState(0);

  return (
    <div className={"pc-card pc-card--" + theme}>

      {badge && (
        <div className="pc-badge">{badge}</div>
      )}

      <button
        className={"pc-wishlist" + (wishlisted ? " pc-wishlist--active" : "")}
        onClick={() => setWishlisted((prev) => !prev)}
        aria-label="Toggle wishlist"
      >
        <Heart 
        size={17} 
        fill={wishlisted ? "#ff3b5c" : "none"} 
        color={wishlisted ? "#ff3b5c" : "currentColor"} 
        />
      </button>

      <div className="pc-img-zone">
        {image && <img src={image} alt={name} className="pc-product-img" />}

        {swatches.length > 0 && (
          <div className="pc-colors">
            {swatches.map((sw, i) => (
              <button
                key={i}
                className={"pc-swatch" + (activeSwatch === i ? " pc-swatch--active" : "")}
                style={{ background: sw.color }}
                title={sw.label}
                onClick={() => setActiveSwatch(i)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="pc-body">

        {brand && <div className="pc-brand">{brand}</div>}

        <div className="pc-name">{name}</div>

        <div className="pc-meta">
          {rating > 0 && (
            <div className="pc-rating">
              <Star size={13} fill="#ffd23c" color="#ffd23c" />
              <span className="pc-rating__score">{rating}</span>
              {reviewCount && (
                <span className="pc-rating__count">({reviewCount})</span>
              )}
            </div>
          )}
          {inStock && <span className="pc-stock">In Stock</span>}
        </div>

        <div className="pc-price-row">
          <span className="pc-price-main">{price}</span>
          {originalPrice && (
            <span className="pc-price-original">{originalPrice}</span>
          )}
          {discount && (
            <span className="pc-price-save">{discount}</span>
          )}
        </div>

        <div className="pc-actions">
          <button className="pc-btn-cart" onClick={onAddToCart}>
            <ShoppingCart size={16} />
            Add to Cart
          </button>
          <button className="pc-btn-buy" onClick={onBuyNow}>
            Buy Now
          </button>
        </div>

        {delivery && (
          <>
            <div className="pc-divider" />
            <div className="pc-delivery">
              <Truck size={14} />
              <span>Free delivery by <b>{delivery}</b></span>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default ProductCard;
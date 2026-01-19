import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div className="empty-cart">
      <div className="empty-cart-content">
        <div className="empty-cart-icon">
          <img src="/shopping.png" alt="cart" width="200px"></img>
        </div>
        <h2 className="empty-cart-title">Your Cart is Empty</h2>
        <p className="empty-cart-message">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Link to="/" className="empty-cart-btn">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default EmptyCart;

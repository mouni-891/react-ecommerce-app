import { useCart } from "@/context/CartContext.jsx";
import "./cartPage.css";

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const itemTotal = item.price * item.quantity;

  return (
    <div className="cart-item">
      <img className="cart-item-image" src={item.img} alt={item.title} />

      <div className="cart-item-details">
        <h4 className="cart-item-title">{item.name}</h4>
        <p className="cart-item-price">₹{item.price.toFixed(2)}</p>

        <div className="cart-item-quantity">
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="quantity-value">{item.quantity}</span>
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(item.quantity + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <button
        className="remove-btn"
        onClick={() => removeFromCart(item.id)}
        aria-label="Remove item from cart"
      >
        Remove
      </button>
    </div>
  );
}

export default CartItem;

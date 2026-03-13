import { useCart } from "@/context/CartContext.jsx";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { getImageUrl } from "@/api";
import "./cartPage.css";

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item._id);
    } else {
      updateQuantity(item._id, newQuantity);
    }
  };

  const itemTotal = item.price * item.quantity;

  return (
    <div className="cart-item">
      {/* Product Image */}
      <img
        className="cart-item-image"
        src={getImageUrl(item.img)}
        alt={item.name}
      />

      {/* Details */}
      <div className="cart-item-details">
        <h4 className="cart-item-title">{item.name}</h4>
        <p className="cart-item-price">₹{item.price.toFixed(2)}</p>

        {/* Quantity Controls */}
        <div className="cart-item-quantity">
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(item.quantity - 1)}
          >
            <FaMinus />
          </button>

          <span className="quantity-value">{item.quantity}</span>

          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            <FaPlus />
          </button>
        </div>
      </div>

      {/* Remove Button */}
      <button
        className="remove-btn"
        onClick={() => removeFromCart(item._id)}
      >
        <FaTrash />
      </button>
    </div>
  );
}

export default CartItem;
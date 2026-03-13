import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import cartIcon from "@/assets/icons/cart.png";

function CartIcon() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  return (
    <button
      className="cart-btn"
      title="Shopping Cart"
      onClick={() => navigate("/cart")}
    >
      <img src={cartIcon} alt="Cart" width="23px" />
      <sup className="cart-badge">{cartItems.length}</sup>
    </button>
  );
}
export default CartIcon;

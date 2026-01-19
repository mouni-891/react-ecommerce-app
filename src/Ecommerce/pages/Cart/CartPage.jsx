import { useCart } from "@context/CartContext";

import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";
import "./cartPage.css";

function CartPage() {
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }
  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <div className="cart-items-container">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <CartSummary />
    </div>
  );
}

export default CartPage;

import React from "react";
import { useCart } from "@/context/CartContext.jsx";
import CartItem from "./CartItem.jsx";
import CartSummary from "./CartSummary.jsx";
import EmptyCart from "./EmptyCart.jsx";
import "./cartPage.css";

function CartPage() {
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }
  return (
    <div className="cart-page">
      <h2>My Cart</h2>
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

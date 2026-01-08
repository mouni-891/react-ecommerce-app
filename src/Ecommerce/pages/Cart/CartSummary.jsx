import { useCart } from "@context/CartContext";

function CartSummary() {
  const { cartItems, clearCart } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.18; // 18% GST (India)
  const total = subtotal + tax;
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    const orderDetails = {
      items: cartItems,
      subtotal: subtotal,
      tax: tax,
      total: total,
      orderDate: new Date().toISOString(),
    };
    alert(
      `Proceeding to checkout...\nTotal Amount: ₹${total.toFixed(
        2
      )}\n\nIn production, this would redirect to payment gateway (Razorpay/Stripe/PayPal)`
    );
  };

  return (
    <div className="cart-summary">
      <div className="summary-card">
        <h3 className="summary-title">Order Summary</h3>

        <div className="summary-row">
          <span>Items ({itemCount})</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="summary-row">
          <span>Tax (18% GST)</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>

        <div className="summary-divider"></div>

        <div className="summary-row total">
          <span className="total-label">Total Amount</span>
          <span className="total-amount">₹{total.toFixed(2)}</span>
        </div>

        <button
          className="checkout-btn"
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </button>

        <button
          className="continue-shopping-btn"
          onClick={() => window.history.back()}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default CartSummary;

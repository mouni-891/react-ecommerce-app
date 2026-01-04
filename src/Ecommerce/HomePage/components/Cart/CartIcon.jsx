import { useCart } from '@context/CartContext';

function CartIcon () {
  const { cartItems } = useCart();
    return(
  <button className="cart-btn" title="Shopping Cart">
    <img src="/Images/shopping-cart1.png" alt="Cart" width="23px" />
    <sup className="cart-badge">{cartItems.length}</sup>
  </button>
  );
}
export default CartIcon;

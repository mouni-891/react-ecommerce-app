import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

function WishlistItem({ item }) {
  const { toggleWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = () => {
    addToCart(item);
    toast.success("Added to cart 🛒");
    toggleWishlist(item);
  };

  const handleRemove = () => {
    toggleWishlist(item);
    toast("Removed from wishlist 💔");
  };

  return (
    <div className="wishlist-item-confirms">
      <div className="wishlist-img-wrapper">
        <img src={item.img} alt={item.name} className="wishlist-item-img" />
      </div>

      <div className="wishlist-item-info">
        <h4 className="wishlist-item-name">{item.name}</h4>
        <p className="wishlist-item-price">₹{item.price}</p>

        <div className="wishlist-item-actions">
          <button
            className="wishlist-cart-btn"
            onClick={handleAddToCart}
            disabled={isInCart(item.id)}
          >
            {isInCart(item.id) ? "In Cart" : "Add to Cart"}
          </button>

          <button className="wishlist-remove-btn" onClick={handleRemove}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default WishlistItem;

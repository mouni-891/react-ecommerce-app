import { useWishlist } from "@context/WishlistContext";
import { useNavigate } from "react-router-dom";

function WishlistIcon() {
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <button
      className="wishlist-btn"
      title="Wishlist"
      onClick={() => navigate("/wishlist")}
    >
      <img src="/Images/wishlist.png" alt="Wishlist" width="20px" />

      {wishlist.length > 0 && (
        <span className="wishlist-count">{wishlist.length}</span>
      )}
    </button>
  );
}

export default WishlistIcon;

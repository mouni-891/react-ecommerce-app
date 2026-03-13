import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import wishlistIcon from "@/assets/icons/wishlist.png";

function WishlistIcon() {
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <button
      className="wishlist-btn"
      title="Wishlist"
      onClick={() => navigate("/wishlist")}
    >
      <img src={wishlistIcon} alt="Wishlist" width="20px" />

      {wishlist.length > 0 && (
        <span className="wishlist-count">{wishlist.length}</span>
      )}
    </button>
  );
}

export default WishlistIcon;

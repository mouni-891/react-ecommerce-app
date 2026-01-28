import { useWishlist } from "@/context/WishlistContext";
import { useNavigate } from "react-router-dom";
import WishlistItem from "@/pages/Wishlist/WishlistItem";
import "./WishlistPage.css";

const WishlistPage = () => {
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="wishlist-empty-container">
        <img
          src="/wishlist/empty-wishlist.png"
          alt="Empty Wishlist"
          className="wishlist-empty-image"
        />

        <h2>No favourites yet</h2>

        <p>
          Love something? Tap the <span>❤️</span> to save your favourites
        </p>

        <button className="wishlist-view-btn" onClick={() => navigate("/")}>
          Explore Products
        </button>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <h1 className="wishlist-title">My Wishlist</h1>

      <div className="wishlist-grid">
        {wishlist.map((item) => (
          <WishlistItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;

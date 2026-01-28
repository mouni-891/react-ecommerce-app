import { useNavigate } from "react-router-dom";
import CartIcon from "./CartIcon";
import WishlistIcon from "./WishlistIcon";
import { useAuth } from "@/auth/AuthContext.jsx";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    if (user) {
      logout();
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <div
          className="logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <span className="logo-icon">🛍️</span>
          <span className="logo-text">ShopMate</span>
        </div>
      </div>

      <div className="header-center">
        <span className="search-icon">
          <img src="/Images/searchIcon.png" alt="Search" width="15px" />
        </span>
        <input
          type="text"
          placeholder="Search for Products, Brand..."
          className="search-input"
        />
        <button className="search-btn voice-btn" title="Voice Search">
          <img src="/Images/searchMic.png" alt="Voice" width="17px" />
        </button>
        <button className="search-btn camera-btn" title="Camera Search">
          <img src="/Images/searchCamera.png" alt="Camera" width="19px" />
        </button>
      </div>

      <div className="header-right">
        <button className="login-btn" onClick={handleLoginClick}>
          <img src="/Images/user.png" alt="User" width="18px" />
          <span className="login">{user ? `Hi, ${user.name}` : "Login"}</span>
        </button>
        <WishlistIcon />
        <CartIcon />
      </div>
    </header>
  );
}

export default Header;

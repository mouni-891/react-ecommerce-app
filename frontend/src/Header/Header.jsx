import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import CartIcon from "./CartIcon";
import WishlistIcon from "./WishlistIcon";
import { useAuth } from "@/auth/AuthContext.jsx";
import toast from "react-hot-toast";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleLoginClick = () => {
    if (user) {
      setShowDropdown(!showDropdown);
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/");
    setShowDropdown(false);
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
        <div className="user-menu" ref={dropdownRef}>
          <button className="login-btn" onClick={handleLoginClick}>
            <img src="/Images/user.png" alt="User" width="18px" />
            <span className="login">{user ? `Hi, ${user.name}` : "Login"}</span>
            {user && <span className="dropdown-arrow">▼</span>}
          </button>

          {user && showDropdown && (
            <div className="dropdown-menu">
              <Link
                to="/account"
                onClick={() => setShowDropdown(false)}
                className="dropdown-item"
              >
                <span>👤</span> My Account
              </Link>
              <hr className="dropdown-divider" />
              <button onClick={handleLogout} className="dropdown-item logout">
                <span>🚪</span> Logout
              </button>
            </div>
          )}
        </div>

        <WishlistIcon />
        <CartIcon />
      </div>
    </header>
  );
}

export default Header;

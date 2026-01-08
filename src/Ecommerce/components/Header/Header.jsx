import CartIcon from "./CartIcon";
import WishlistIcon from "./WishlistIcon";


function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <a href="/" className="logo">
          <span className="logo-icon">🛍️</span>
          <span className="logo-text">ShopMate</span>
        </a>
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
          <img src="/Images/searchCamera1.png" alt="Camera" width="19px" />
        </button>
      </div>

      <div className="header-right">
        <button className="login-btn">
          <img src="/Images/user.png" alt="User" width="18px" />{" "}
          <span className="login">Login</span>
        </button>
        <WishlistIcon />
        <CartIcon />
      </div>
    </header>
  );
}

export default Header;

import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { SiVisa, SiMastercard, SiPaypal } from "react-icons/si";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">

        {/* Brand */}
        <div className="footer-col">
          <h2 className="footer-logo">ShopMate</h2>
          <p className="footer-text">
            ShopMate brings you the best fashion, electronics, beauty,
            and lifestyle products at unbeatable prices.
          </p>

          <div className="social-icons">
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
            <FaYoutube />
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
        </div>

        {/* Categories */}
        <div className="footer-col">
          <h3>Shop Categories</h3>
          <Link to="/category/men">Men</Link>
          <Link to="/category/women">Women</Link>
          <Link to="/category/electronics">Electronics</Link>
          <Link to="/category/beauty">Beauty</Link>
        </div>

        {/* Customer Service */}
        <div className="footer-col">
          <h3>Customer Service</h3>
          <Link to="/account">My Account</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/contact">Support</Link>
        </div>

        {/* Newsletter */}
        <div className="footer-col">
          <h3>Newsletter</h3>
          <p>Subscribe to get special offers & updates.</p>
          <div className="newsletter">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>

      </div>

      {/* Payment Section */}
      <div className="footer-payments">
        <SiVisa />
        <SiMastercard />
        <SiPaypal />
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} ShopMate. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;

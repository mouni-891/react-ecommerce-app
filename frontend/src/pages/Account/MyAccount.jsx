// src/pages/Account/MyAccount.jsx
import { useState } from "react";
import { useAuth } from "@/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./MyAccount.css";

function MyAccount() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    // Update user data in localStorage
    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-account-page">
      <div className="account-container">
        <h1>My Account</h1>

        {/* Profile Section */}
        <div className="account-section">
          <div className="section-header">
            <h2>Profile Information</h2>
            {!isEditing && (
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSave} className="edit-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: user.name,
                      email: user.email,
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-info">
              <div className="info-item">
                <label>Name:</label>
                <span>{user.name}</span>
              </div>
              <div className="info-item">
                <label>Email:</label>
                <span>{user.email}</span>
              </div>
              <div className="info-item">
                <label>Member Since:</label>
                <span>{new Date(user.id).toLocaleDateString()}</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="account-section">
          <h2>Quick Links</h2>
          <div className="quick-links">
            <button onClick={() => navigate("/cart")}>🛒 My Cart</button>
            <button onClick={() => navigate("/wishlist")}>
              ❤️ My Wishlist
            </button>
            <button onClick={() => navigate("/orders")}>
              📦 Order History
            </button>
          </div>
        </div>

        {/* Logout */}
        <div className="account-section">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;

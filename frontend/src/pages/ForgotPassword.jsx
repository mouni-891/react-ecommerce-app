import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../pages/Login/Login.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      setSent(true);
      toast.success("Reset link sent! Check your email.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (sent) return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-header">
          <div style={{ fontSize: 48, marginBottom: 12 }}>📧</div>
          <h1>Check Your Email</h1>
          <p style={{ marginTop: 8, opacity: 0.9 }}>
            We sent a reset link to
          </p>
          <p style={{ fontWeight: 700, fontSize: 16, marginTop: 4 }}>
            {email}
          </p>
          <p style={{ marginTop: 8, fontSize: 13, opacity: 0.7 }}>
            Link expires in 15 minutes.
          </p>
        </div>
        <div className="login-form">
          <button onClick={() => navigate("/login")}>
            Back to Login
          </button>
          <p className="signup-text">
            Didn't receive email?{" "}
            <span onClick={() => setSent(false)}>Try again</span>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-header">
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔐</div>
          <h1>Forgot Password</h1>
          <p style={{ opacity: 0.9 }}>
            Enter your email to receive a reset link
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>

          <p className="signup-text">
            Remember your password?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
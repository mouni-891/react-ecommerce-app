import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import "./Signup.css";

const getStrength = (pw) => {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
};

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (formData.name.trim().length < 2) {
      toast.error("Enter a valid name");
      return false;
    }
    if (!formData.email.includes("@")) {
      toast.error("Enter a valid email address");
      return false;
    }
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      toast.success("Account created successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false); // ✅ was missing before — fixed
    }
  };

  const strength = getStrength(formData.password);
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["", "#E24B4A", "#EF9F27", "#EF9F27", "#1D9E75"];

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-header">
          <h1>Create Account</h1>
          <p>Sign up to explore amazing deals</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isLoading}
            autoComplete="name"
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
            autoComplete="email"
          />

          <label htmlFor="password">Password</label>
          <div className="password-field">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Min. 8 characters"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isLoading}
              autoComplete="new-password"
            />
            <span
              className="eye"
              role="button"
              tabIndex={0}
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((p) => !p)}
              onKeyDown={(e) => e.key === "Enter" && setShowPassword((p) => !p)}
            >
              {showPassword ? (
                <EyeOff size={20} color="#888" />
              ) : (
                <Eye size={20} color="#888" />
              )}
            </span>
          </div>

          {/* Password Strength Meter */}
          {formData.password && (
            <div className="strength-wrapper">
              <div className="strength-bar">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="strength-seg"
                    style={{
                      background:
                        i <= strength ? strengthColors[strength] : undefined,
                    }}
                  />
                ))}
              </div>
              <span
                className="strength-label"
                style={{ color: strengthColors[strength] }}
              >
                {strengthLabels[strength]}
              </span>
            </div>
          )}

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Re-enter password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            disabled={isLoading}
            autoComplete="new-password"
          />

          {/* Match indicator */}
          {formData.confirmPassword && (
            <span
              className={`pw-match ${
                formData.password === formData.confirmPassword ? "ok" : "no"
              }`}
            >
              {formData.password === formData.confirmPassword
                ? "✓ Passwords match"
                : "✗ Passwords do not match"}
            </span>
          )}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Account"}
          </button>

          <p className="signup-text">
            Already have an account?
            <span onClick={() => navigate("/login")}> Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;

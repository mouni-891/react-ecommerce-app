import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@auth/AuthContext";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    login({
      name: "Mounika",
      email,
    });

    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login</h2>
        <p>Sign in to your account</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input type="password" placeholder="Password" required />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;

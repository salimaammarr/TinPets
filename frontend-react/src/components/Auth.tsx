import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Auth: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, register } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === "/login";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        await login(username, password);
      } else {
        await register(username, password);
      }
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-custom-navy">
      <div
        className="card shadow-lg border-0 rounded-4"
        style={{ maxWidth: "400px", width: "90%" }}
      >
        <div className="card-body p-4">
          <div className="text-center mb-4">
            <Link to="/" className="text-decoration-none">
              <img
                src={`${process.env.PUBLIC_URL}/logo.png`}
                alt="TinPets Logo"
                height="60"
                className="mb-3"
              />
            </Link>
            <h2 className="text-custom-navy mb-0">
              {isLogin ? "Welcome Back!" : "Create Account"}
            </h2>
            <p className="text-muted">
              {isLogin ? "Login to your account" : "Join our pet community"}
            </p>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="username"
                className="form-label text-custom-brown"
              >
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="form-label text-custom-brown"
              >
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-custom-primary w-100 mb-3">
              {isLogin ? "Login" : "Sign Up"}
            </button>

            <div className="text-center">
              <p className="mb-0">
                {isLogin ? (
                  <>
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-custom-orange">
                      Sign up
                    </Link>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <Link to="/login" className="text-custom-orange">
                      Login
                    </Link>
                  </>
                )}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;

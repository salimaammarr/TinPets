import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { auth } from "../services/api";
import { AuthResponse } from "../types/api";

type AuthMode = "login" | "signup";

interface FormData {
  username: string;
  password: string;
  confirmPassword?: string;
}

const Auth: React.FC = () => {
  const location = useLocation();
  const [mode, setMode] = useState<AuthMode>("signup");
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Set initial mode based on URL
  useEffect(() => {
    setMode(location.pathname === "/login" ? "login" : "signup");
  }, [location.pathname]);

  const validateForm = () => {
    // Username validation: letters and digits only
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(formData.username)) {
      setMessage("Username must contain only letters and digits");
      return false;
    }

    // Password validation: letters and digits, minimum 4 characters
    const passwordRegex = /^[a-zA-Z0-9]{4,}$/;
    if (!passwordRegex.test(formData.password)) {
      setMessage(
        "Password must contain only letters and digits (minimum 4 characters)"
      );
      return false;
    }

    // Additional validation for signup
    if (mode === "signup" && formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response =
        mode === "login"
          ? await auth.login(formData.username, formData.password)
          : await auth.register(formData.username, formData.password);

      const { token, userId } = response.data;

      if (mode === "login") {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
      }
      navigate("/");
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || `Failed to ${mode}. Please try again.`
      );
      console.error("Authentication error:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setMessage(""); // Clear error message when user starts typing
  };

  return (
    <div className="auth-page min-vh-100 d-flex align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="text-center mb-4">
              <Link to="/">
                <img
                  src="/logo.png"
                  alt="TinPets Logo"
                  className="logo-img mb-4"
                  style={{ height: "80px" }}
                />
              </Link>
            </div>

            <div className="card shadow border-custom-peach">
              <div className="card-body p-4">
                <h1 className="h3 text-center text-custom-purple mb-4">
                  {mode === "login" ? "Welcome Back!" : "Create Your Account"}
                </h1>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label
                      htmlFor="username"
                      className="form-label text-custom-purple"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                      autoFocus
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      className="form-label text-custom-purple"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {mode === "signup" && (
                    <div className="mb-4">
                      <label
                        htmlFor="confirmPassword"
                        className="form-label text-custom-purple"
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  )}

                  <div className="d-grid gap-2">
                    <button
                      type="submit"
                      className="btn btn-custom-primary py-2"
                    >
                      {mode === "login" ? "Login" : "Create Account"}
                    </button>
                    <Link
                      to={mode === "login" ? "/create-account" : "/login"}
                      className="btn btn-link text-custom-brown"
                    >
                      {mode === "login"
                        ? "Don't have an account? Sign up"
                        : "Already have an account? Login"}
                    </Link>
                  </div>

                  {message && (
                    <div className="alert alert-danger mt-3 text-center">
                      {message}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthMode = "login" | "signup";

interface FormData {
  username: string;
  password: string;
  confirmPassword?: string;
}

const Auth: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>("signup");
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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
      const endpoint = mode === "login" ? "/api/login" : "/api/createAccount";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (mode === "login") {
          // Store the token or user data in localStorage/sessionStorage
          localStorage.setItem("user", JSON.stringify(data));
        }
        navigate("/"); // Redirect to home page after successful auth
      } else {
        setMessage(data.message || `Failed to ${mode}. Please try again.`);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setMessage("");
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm border-custom-peach">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <img
                  src="/logo.png"
                  alt="TinPets Logo"
                  className="logo-img mb-3"
                  style={{ height: "60px" }}
                />
                <h1 className="h3 text-custom-purple">
                  {mode === "login" ? "Welcome Back!" : "Create Account"}
                </h1>
              </div>

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

                <div className="d-grid mb-3">
                  <button type="submit" className="btn btn-custom-primary">
                    {mode === "login" ? "Login" : "Create Account"}
                  </button>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-link text-custom-brown"
                    onClick={toggleMode}
                  >
                    {mode === "login"
                      ? "Don't have an account? Sign up"
                      : "Already have an account? Login"}
                  </button>
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
  );
};

export default Auth;

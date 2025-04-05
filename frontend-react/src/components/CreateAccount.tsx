import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateAccount: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    // Username validation: letters and digits only
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(username)) {
      setMessage("Username must contain only letters and digits");
      return false;
    }

    // Password validation: letters and digits, minimum 4 characters
    const passwordRegex = /^[a-zA-Z0-9]{4,}$/;
    if (!passwordRegex.test(password)) {
      setMessage(
        "Password must contain only letters and digits (minimum 4 characters)"
      );
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
      const response = await fetch("/api/createAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Account created successfully, redirect to login
        navigate("/login");
      } else {
        setMessage(
          data.message || "Failed to create account. Please try again."
        );
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm border-custom-green">
            <div className="card-body p-4">
              <h1 className="text-center mb-3 text-custom-brown">
                Let's get started!
              </h1>
              <p className="text-muted text-center mb-4">
                Enter your username and password to create an account
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="username"
                    className="form-label text-custom-brown"
                  >
                    Username:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="letters and digits"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="form-label text-custom-brown"
                  >
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="letters and digits (4 digits minimum)"
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-custom-primary">
                    Create account
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

export default CreateAccount;

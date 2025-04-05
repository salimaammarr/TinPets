import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateAccount.css";

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
    <div className="create-account">
      <h1>Let's get started!</h1>
      <form onSubmit={handleSubmit}>
        <p>Enter your username and password to create an account</p>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="letters and digits"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="letters and digits (4 digits minimum)"
            required
          />
        </div>
        <button type="submit">Create account</button>
        {message && <p className="error-message">{message}</p>}
      </form>
    </div>
  );
};

export default CreateAccount;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header: React.FC = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-custom-navy sticky-top py-3 px-4 shadow">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/logo.png"
            alt="TinPets Logo"
            height="40"
            className="me-2"
          />
          <span className="text-custom-yellow">TinPets</span>
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          onClick={() => setIsNavCollapsed(!isNavCollapsed)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          id="navbarNav"
        >
          <ul className="navbar-nav me-auto">
            <li className="nav-item px-3">
              <Link className="nav-link" to="/find-pets">
                <i className="fas fa-paw me-1"></i> Find Pets
              </Link>
            </li>
            <li className="nav-item px-3">
              <Link className="nav-link" to="/pet-care">
                <i className="fas fa-heart me-1"></i> Pet Care
              </Link>
            </li>
            <li className="nav-item px-3">
              <Link className="nav-link" to="/contact">
                <i className="fas fa-envelope me-1"></i> Contact
              </Link>
            </li>
          </ul>

          <div className="d-flex">
            {user ? (
              <>
                <Link className="btn btn-custom-primary me-2" to="/giveaway">
                  <i className="fas fa-gift me-1"></i> Giveaway
                </Link>
                <button
                  className="btn btn-outline-light"
                  onClick={handleLogout}
                >
                  <i className="fas fa-sign-out-alt me-1"></i> Logout
                </button>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-light me-2" to="/login">
                  <i className="fas fa-sign-in-alt me-1"></i> Login
                </Link>
                <Link className="btn btn-custom-primary" to="/signup">
                  <i className="fas fa-user-plus me-1"></i> Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const location = useLocation();

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-custom-navy sticky-top py-2 shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/logo.png"
            alt="TinPets Logo"
            className="logo-img me-2"
            style={{ height: "40px" }}
          />
          <span className="fw-bold text-custom-yellow">TinPets</span>
        </Link>

        <button
          className="navbar-toggler border-0 focus-ring focus-ring-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          id="navbarNav"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-1">
            <li className="nav-item">
              <Link
                className={`nav-link px-3 ${
                  isActive("/find-pets") ? "active nav-active" : ""
                }`}
                to="/find-pets"
              >
                <i className="fas fa-search me-1"></i>
                Find Pets
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link px-3 ${
                  isActive("/pet-care") ? "active nav-active" : ""
                }`}
                to="/pet-care"
              >
                <i className="fas fa-paw me-1"></i>
                Pet Care
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link px-3 ${
                  isActive("/contact") ? "active nav-active" : ""
                }`}
                to="/contact"
              >
                <i className="fas fa-envelope me-1"></i>
                Contact
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav gap-1">
            <li className="nav-item">
              <Link
                className={`nav-link px-3 ${
                  isActive("/login") ? "active nav-active" : ""
                }`}
                to="/login"
              >
                <i className="fas fa-sign-in-alt me-1"></i>
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link btn btn-custom-primary ms-lg-2 px-4 rounded-pill"
                to="/create-account"
              >
                <i className="fas fa-user-plus me-1"></i>
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

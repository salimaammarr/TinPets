import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="hero-section position-relative vh-100 d-flex align-items-center">
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage:
            "linear-gradient(rgba(45, 27, 59, 0.6), rgba(92, 39, 81, 0.7))",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
        }}
      ></div>

      {/* Navigation */}
      <nav className="position-absolute top-0 start-0 w-100 py-3">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <Link
              to="/"
              className="text-custom-peach text-decoration-none d-flex align-items-center"
            >
              <img
                src="/logo.png"
                alt="TinPets Logo"
                className="logo-img-hero"
                style={{ height: "60px" }}
              />
            </Link>
            <div className="d-flex gap-3">
              <Link to="/login" className="btn btn-outline-light btn-sm px-3">
                Login
              </Link>
              <Link
                to="/create-account"
                className="btn btn-custom-primary btn-sm px-3"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center text-light">
            <h1 className="display-3 fw-bold mb-4 text-white">
              Find Your Perfect Pet
            </h1>
            <h2 className="h3 mb-4 text-custom-peach">
              Connect with Your New Best Friend
            </h2>
            <p className="lead mb-5">
              Your journey to finding the perfect furry companion starts here.
              We connect loving families with pets in need of a forever home.
              Whether you're looking for a playful pup or a cuddly cat, we're
              here to help make the perfect match.
            </p>
            <div className="d-flex flex-column align-items-center gap-4">
              <Link
                to="/create-account"
                className="btn btn-custom-primary btn-lg px-5 py-3"
              >
                <i className="fas fa-paw me-2"></i>
                Get Started
              </Link>
              <div className="d-flex gap-3">
                <Link
                  to="/find-pets"
                  className="btn btn-outline-light px-4 py-2"
                >
                  <i className="fas fa-search me-2"></i>
                  Find Pets
                </Link>
                <Link
                  to="/pet-care"
                  className="btn btn-outline-light px-4 py-2"
                >
                  <i className="fas fa-heart me-2"></i>
                  Pet Care Guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Image */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: 'url("/shutterstock-343233627.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -2,
        }}
      ></div>
    </div>
  );
};

export default Home;

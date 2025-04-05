import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="hero-section position-relative vh-100 d-flex align-items-center">
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/hero-pets.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
        }}
      ></div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center text-light">
            <h1 className="display-3 fw-bold mb-4 text-white">
              Welcome to TinPets
            </h1>
            <h2 className="h3 mb-4 text-custom-yellow">
              Find Your Perfect Companion
            </h2>
            <p className="lead mb-5">
              Your go-to platform for finding your new furry friend. We connect
              loving families with pets in need of a forever home. Whether
              you're looking for a playful pup or a cuddly cat, we're here to
              help you find your perfect match.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Link
                to="/find-pets"
                className="btn btn-custom-primary btn-lg px-4 py-2"
              >
                <i className="fas fa-search me-2"></i>
                Find Pets
              </Link>
              <Link
                to="/pet-care"
                className="btn btn-outline-light btn-lg px-4 py-2"
              >
                <i className="fas fa-paw me-2"></i>
                Pet Care Guide
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

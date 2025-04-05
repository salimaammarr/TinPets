import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-custom-yellow">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <h1 className="mb-3 text-custom-navy">Welcome to TinPets!</h1>
                <h4 className="text-custom-orange mb-3">
                  Find Your Perfect Companion
                </h4>
              </div>
              <p className="text-center">
                TinPets is your go-to platform for finding your new furry
                friend. Our mission is to connect loving families with pets in
                need of a forever home. Explore our website to discover a
                variety of cats and dogs available for adoption. Whether you're
                looking for a playful pup or a cuddly cat, we're here to help
                you find your perfect match.
              </p>
              <div className="text-center mt-4">
                <Link to="/find-pets" className="btn btn-custom-primary me-2">
                  Find Pets
                </Link>
                <Link to="/pet-care" className="btn btn-custom-secondary">
                  Pet Care
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

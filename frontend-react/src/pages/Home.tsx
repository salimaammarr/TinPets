import React from "react";

const Home: React.FC = () => {
  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h1 className="text-center mb-4">Welcome to TinPets!</h1>
              <p className="text-muted text-center">
                TinPets is your go-to platform for finding your new furry
                friend. Our mission is to connect loving families with pets in
                need of a forever home. Explore our website to discover a
                variety of cats and dogs available for adoption. Whether you're
                looking for a playful pup or a cuddly cat, we're here to help
                you find your perfect match.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

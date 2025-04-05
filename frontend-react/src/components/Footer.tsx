import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3 mb-md-0">
            <div className="d-flex align-items-center mb-2">
              <img
                src="/logo.png"
                alt="TinPets Logo"
                height="25"
                className="me-2"
              />
              <h5 className="mb-0">TinPets</h5>
            </div>
            <p className="text-muted">Finding homes for pets in need.</p>
          </div>
          <div className="col-md-4 mb-3 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/find-pets"
                  className="text-light text-decoration-none"
                >
                  Find Pets
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-light text-decoration-none">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Legal</h5>
            <ul className="list-unstyled">
              <li>
                <Link
                  to="/disclaimer"
                  className="text-light text-decoration-none"
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-3" />
        <div className="text-center text-muted">
          <small>
            &copy; {new Date().getFullYear()} TinPets. All rights reserved.
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

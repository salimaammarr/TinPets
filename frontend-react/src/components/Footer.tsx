import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-custom-navy py-2 mt-auto">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4 text-center text-md-start mb-2 mb-md-0">
            <small className="text-light">
              © 2024 TinPets. All rights reserved.
            </small>
          </div>
          <div className="col-md-8">
            <ul className="list-inline mb-0 text-center text-md-end">
              <li className="list-inline-item">
                <Link
                  to="/disclaimer"
                  className="text-light text-decoration-none small"
                >
                  Disclaimer
                </Link>
              </li>
              <li className="list-inline-item ms-3">
                <Link
                  to="/contact"
                  className="text-light text-decoration-none small"
                >
                  Contact
                </Link>
              </li>
              <li className="list-inline-item ms-3">
                <a href="#" className="text-light text-decoration-none small">
                  Privacy Policy
                </a>
              </li>
              <li className="list-inline-item ms-3">
                <a href="#" className="text-light text-decoration-none small">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

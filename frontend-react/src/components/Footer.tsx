import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/disclaimer">Disclaimer</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} TinPets. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/find-pets">Find Pets</Link>
          </li>
          <li>
            <Link to="/dog-care">Dog Care</Link>
          </li>
          <li>
            <Link to="/cat-care">Cat Care</Link>
          </li>
          <li>
            <Link to="/giveaway">Giveaway</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/create-account">Create Account</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

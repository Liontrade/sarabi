import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../../assets/logo_without_background.png";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; 

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src={logo} alt="LionTrade Logo" className="navbar__logo-img" />
        <h1 className="navbar__brand">LionTrade</h1>
      </div>

      {/* Hamburger Menu Button */}
      <button className="navbar__toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Links - Responsive Menu */}
      <ul className={`navbar__links ${menuOpen ? "navbar__links--active" : ""}`}>
        <li>
          <a href="#why-liontrade">Why LionTrade?</a>
        </li>
        <li>
          <a href="#live-market-insights">Live Market Insights</a>
        </li>
        <li>
          <a href="#ai-predictions">AI Predictions</a>
        </li>
        <li>
          <a href="#pricing-plans">Pricing &amp; Plans</a>
        </li>
        <li>
          <a href="#learn-grow">Learn &amp; Grow</a>
        </li>
      </ul>

      {/* Login & Signup Buttons */}
      <div className="navbar__actions">
        <Link to="/login" className="btn btn--login">
          Login
        </Link>
        <Link to="/signup" className="btn btn--signup">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

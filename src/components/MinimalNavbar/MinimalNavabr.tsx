import React from 'react';
import { Link } from 'react-router-dom';
import './MinimalNavbar.css';
import logo from '../../assets/logo_without_background.png';

const MinimalNavbar: React.FC = () => {
  return (
    <header className="minimal-navbar">
      <div className="minimal-navbar__brand">
        {
          <img src={logo} alt="LionTrade Logo" className="minimal-navbar__logo" />
        }
        <h1 className="minimal-navbar__title">LionTrade</h1>
      </div>
      {}
      <Link to="/login" className="minimal-navbar__signin">
        Sign In
      </Link>
    </header>
  );
};

export default MinimalNavbar;

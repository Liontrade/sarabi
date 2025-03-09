import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MinimalNavbar.css';
import logo from '../../assets/logo_without_background.png';

interface MinimalNavbarProps {
  variant: 'signup' | 'login';
}

const MinimalNavbar: React.FC<MinimalNavbarProps> = ({ variant }) => {
  const navigate = useNavigate();

  const isSignupVariant = variant === 'signup';
  const buttonText = isSignupVariant ? 'Sign Up' : 'Sign In';
  const buttonLink = isSignupVariant ? '/signup' : '/login';

  return (
    <header className="minimal-navbar">
      <div
        className="minimal-navbar__brand"
        onClick={() => navigate('/')}
        role="button"
        tabIndex={0} // aby element był dostępny z klawiatury
      >
        <img src={logo} alt="LionTrade Logo" className="minimal-navbar__logo" />
        <h1 className="minimal-navbar__title">LionTrade</h1>
      </div>
      <button
        className="minimal-navbar__button"
        onClick={() => navigate(buttonLink)}
      >
        {buttonText}
      </button>
    </header>
  );
};

export default MinimalNavbar;

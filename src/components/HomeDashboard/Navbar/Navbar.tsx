import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../../assets/logo_without_background.png';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    console.log('Signing out...');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <div className="navbar__brand" onClick={() => navigate('/home')}>
          <img src={logo} alt="LionTrade" className="navbar__logo" />
          <h1 className="navbar__title">LionTrade</h1>
        </div>
        {/* Menu linki */}
        <ul className="navbar__links">
          <li><a href="#market">Market</a></li>
          <li><a href="#ai-predictions">AI Predictions</a></li>
          <li><a href="#my-investments">My Investments</a></li>
          <li><a href="#market-news">Market News/Alerts</a></li>
        </ul>
      </div>

      <div className="navbar__right">
        <button className="navbar__signout" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

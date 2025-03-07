import React from 'react';
import './Navbar.css';
import logo from '../../assets/logo_without_background.png';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="navbar__logo">
                 <img src={logo} alt="LionTrade Logo" className="navbar__logo-img" />
                <h1 className="navbar__brand">LionTrade</h1>
            </div>
            <ul className="navbar__links">
                <li><a href="#why-liontrade">Why LionTrade?</a></li>
                <li><a href="#live-market-insights">Live Market Insights</a></li>
                <li><a href="#ai-predictions">AI Predictions</a></li>
                <li><a href="#pricing-plans">Pricing &amp; Plans</a></li>
                <li><a href="#learn-grow">Learn &amp; Grow</a></li>
            </ul>
            <div className="navbar__actions">
                <button className="btn btn--login">Login</button>
                <button className="btn btn--signup">Sign Up</button>
            </div>
        </nav>
    );
};

export default Navbar;

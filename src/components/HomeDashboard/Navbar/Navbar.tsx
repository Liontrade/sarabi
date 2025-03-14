import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../../assets/logo_without_background.png';
import { IoSettingsOutline, IoNotificationsOutline } from 'react-icons/io5';

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        console.log('Signing out...');
        navigate('/login');
    };

    const handleSettingsClick = () => {
        console.log('SettingsPage clicked');
        navigate('/settings');
    };

    const handleNotificationsClick = () => {
        console.log('Notifications clicked');
    };

    return (
        <nav className="navbar">
            <div className="navbar__left">
                <div className="navbar__brand" onClick={() => navigate('/dashboard')}>
                    <img src={logo} alt="LionTrade" className="navbar__logo" />
                    <h1 className="navbar__title">LionTrade</h1>
                </div>
            </div>

            <div className="navbar__right">
                <ul className="navbar__links">
                    <li>
                        <Link to="/market">Market</Link>
                    </li>
                    <li>
                        <Link to="/predictions">AI Predictions</Link>
                    </li>
                    <li>
                        <Link to="/investments">My Investments</Link>
                    </li>
                    <li>
                        <Link to="/news">Market News/Alerts</Link>
                    </li>
                </ul>

                <div className="navbar__icons">
                    <div className="navbar__icon-btn" onClick={handleNotificationsClick}>
                        <IoNotificationsOutline className="navbar__icon" />
                        <span className="notification-badge">3</span>
                    </div>

                    <div className="navbar__icon-btn" onClick={handleSettingsClick}>
                        <IoSettingsOutline className="navbar__icon" />
                    </div>
                </div>

                <button className="navbar__signout" onClick={handleSignOut}>
                    Sign Out
                </button>
            </div>
        </nav>
    );
};

export default Navbar;

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../../assets/logo_without_background.png';
import {
    IoNotificationsOutline,
    IoSunnyOutline,
    IoMoonOutline,
    IoChevronDownOutline,
    IoMenuOutline,
    IoCloseOutline,
} from 'react-icons/io5';
import userAvatar from '../../../assets/home-page/user-avatar.png';

import {
    BRAND_NAME,
    NAV_DASHBOARD_LABEL,
    NAV_KNOWLEDGE_LABEL,
    NAV_MARKET_LABEL,
    NAV_NEWS_ALERTS_LABEL,
    SEARCH_PLACEHOLDER,
    NOTIFICATIONS_ARIA_LABEL,
    PROFILE_LABEL,
    SETTINGS_LABEL,
    LOGOUT_LABEL,
} from '../../../constants/strings';
import {
    DASHBOARD_URL,
    KNOWLEDGE_URL,
    MARKET_URL,
    NEWS_ALERTS_URL,
    PROFILE_URL,
    SETTINGS_URL,
    LOGIN_URL,
} from '../../../constants/urls';

const NAV_LINKS = [
    { to: DASHBOARD_URL, label: NAV_DASHBOARD_LABEL },
    { to: KNOWLEDGE_URL, label: NAV_KNOWLEDGE_LABEL },
    { to: MARKET_URL, label: NAV_MARKET_LABEL },
    { to: NEWS_ALERTS_URL, label: NAV_NEWS_ALERTS_LABEL },
];

const PROFILE_OPTIONS = [
    { to: PROFILE_URL, label: PROFILE_LABEL },
    { to: SETTINGS_URL, label: SETTINGS_LABEL },
    { to: LOGIN_URL, label: LOGOUT_LABEL },
];

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark', !darkMode);
    };

    return (
        <nav className="navbar">
            <div className="navbar__left">
                <button className="navbar__mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
                    {mobileOpen ? <IoCloseOutline /> : <IoMenuOutline />}
                </button>

                <div className="navbar__brand" onClick={() => navigate(DASHBOARD_URL)}>
                    <img src={logo} alt={BRAND_NAME()} className="navbar__logo" />
                    <span className="navbar__title">{BRAND_NAME()}</span>
                </div>
            </div>

            <div className={`navbar__center ${mobileOpen ? 'open' : ''}`}>
                {NAV_LINKS.map(link => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) => (isActive ? 'navbar__link active' : 'navbar__link')}
                        onClick={() => setMobileOpen(false)}
                    >
                        {link.label}
                    </NavLink>
                ))}

                <div className="navbar__search">
                    <input
                        type="text"
                        placeholder={SEARCH_PLACEHOLDER()}
                        onKeyDown={e => e.key === 'Enter' && console.log('Search:', e.currentTarget.value)}
                    />
                </div>
            </div>

            <div className="navbar__right">
                <button
                    className="navbar__icon-btn"
                    aria-label={NOTIFICATIONS_ARIA_LABEL()}
                    onClick={() => console.log('Notifications')}
                >
                    <IoNotificationsOutline />
                    <span className="navbar__badge">3</span>
                </button>

                <button className="navbar__icon-btn" onClick={toggleTheme}>
                    {darkMode ? <IoSunnyOutline /> : <IoMoonOutline />}
                </button>

                <div className="navbar__profile" onClick={() => setProfileOpen(!profileOpen)}>
                    <img src={userAvatar} alt="Avatar" className="navbar__avatar" />
                    <IoChevronDownOutline className={`navbar__chevron ${profileOpen ? 'rotated' : ''}`} />
                    {profileOpen && (
                        <div className="navbar__dropdown">
                            {PROFILE_OPTIONS.map(opt => (
                                <button key={opt.to} onClick={() => navigate(opt.to)}>
                                    {opt.label()}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

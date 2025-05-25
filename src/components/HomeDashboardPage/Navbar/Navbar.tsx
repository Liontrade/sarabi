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
import { useTranslation } from 'react-i18next';
import {
    DASHBOARD_URL,
    KNOWLEDGE_URL,
    MARKET_URL,
    NEWS_ALERTS_URL,
    PROFILE_URL,
    SETTINGS_URL,
    LOGIN_URL,
} from '../../../constants/urls';

const Navbar: React.FC = () => {
    const { t } = useTranslation('home_dashboard_navbar');
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const NAV_LINKS = [
        { to: DASHBOARD_URL, label: t('dashboard_label') },
        { to: KNOWLEDGE_URL, label: t('knowledge_label') },
        { to: MARKET_URL, label: t('market_label') },
        { to: NEWS_ALERTS_URL, label: t('news_alerts_label') },
    ];

    const PROFILE_OPTIONS = [
        { to: PROFILE_URL, label: t('profile_label') },
        { to: SETTINGS_URL, label: t('settings_label') },
        { to: LOGIN_URL, label: t('logout_label') },
    ];

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark', !darkMode);
    };

    return (
        <nav className="navbar">
            <div className="navbar__left">
                <button
                    className="navbar__mobile-toggle"
                    onClick={() => setMobileOpen(o => !o)}
                    aria-label={mobileOpen ? t('mobile_close') : t('mobile_open')}
                >
                    {mobileOpen ? <IoCloseOutline /> : <IoMenuOutline />}
                </button>

                <div className="navbar__brand" onClick={() => navigate(DASHBOARD_URL)} role="button" tabIndex={0}>
                    <img src={logo} alt={`${t('dashboard_label')} logo`} className="navbar__logo" />
                    <span className="navbar__title">{t('brand_name')}</span>
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
                        placeholder={t('search_placeholder')}
                        onKeyDown={e => e.key === 'Enter' && console.log('Search:', e.currentTarget.value)}
                    />
                </div>
            </div>

            <div className="navbar__right">
                <button
                    className="navbar__icon-btn"
                    aria-label={t('notifications_aria')}
                    onClick={() => console.log('Notifications')}
                >
                    <IoNotificationsOutline />
                    <span className="navbar__badge">3</span>
                </button>

                <button
                    className="navbar__icon-btn"
                    onClick={toggleTheme}
                    aria-label={darkMode ? t('dark_mode_on') : t('dark_mode_off')}
                >
                    {darkMode ? <IoSunnyOutline /> : <IoMoonOutline />}
                </button>

                <div className="navbar__profile" onClick={() => setProfileOpen(o => !o)}>
                    <img src={userAvatar} alt={t('profile_label')} className="navbar__avatar" />
                    <IoChevronDownOutline className={`navbar__chevron ${profileOpen ? 'rotated' : ''}`} />
                    {profileOpen && (
                        <div className="navbar__dropdown">
                            {PROFILE_OPTIONS.map(opt => (
                                <button key={opt.to} onClick={() => navigate(opt.to)}>
                                    {opt.label}
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

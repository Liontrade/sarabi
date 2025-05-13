import React, { useState } from 'react';
import './Navbar.css';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from '../../../assets/logo_without_background.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NAV_LINKS, ACTION_BUTTONS } from '../../../constants/LandingPage/constants_navbar';

const Navbar: React.FC = () => {
    const { t } = useTranslation('landing_navbar');
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <img src={logo} alt={`${t('brand_name')} Logo`} className="navbar__logo-img" />
                <h1 className="navbar__brand">{t('brand_name')}</h1>
            </div>

            <button
                className="navbar__toggle"
                onClick={() => setMenuOpen(open => !open)}
                aria-label={menuOpen ? t('close_menu') : t('open_menu')}
            >
                {menuOpen ? <FiX /> : <FiMenu />}
            </button>

            <ul className={`navbar__links ${menuOpen ? 'navbar__links--active' : ''}`}>
                {NAV_LINKS.map(({ key, href }, i) => (
                    <li key={i}>
                        <a href={href}>{t(key)}</a>
                    </li>
                ))}
            </ul>

            <div className="navbar__actions">
                {ACTION_BUTTONS.map(({ key, to, variant }, i) => (
                    <Link key={i} to={to} className={`btn btn--${variant}`}>
                        {t(key)}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;

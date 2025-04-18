import React, { useState } from 'react';
import './Navbar.css';
import { FiMenu, FiX } from 'react-icons/fi';
import { NAV_LINKS, ACTION_BUTTONS } from '../../../constants/LandingPage/constants_navbar';
import { BRAND_NAME } from '../../../constants/strings';
import logo from '../../../assets/logo_without_background.png';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <img src={logo} alt={`${BRAND_NAME} Logo`} className="navbar__logo-img" />
                <h1 className="navbar__brand">{BRAND_NAME}</h1>
            </div>

            <button className="navbar__toggle" onClick={() => setMenuOpen(open => !open)}>
                {menuOpen ? <FiX /> : <FiMenu />}
            </button>

            <ul className={`navbar__links ${menuOpen ? 'navbar__links--active' : ''}`}>
                {NAV_LINKS.map((link, i) => (
                    <li key={i}>
                        <a href={link.href}>{link.text}</a>
                    </li>
                ))}
            </ul>

            <div className="navbar__actions">
                {ACTION_BUTTONS.map((btn, i) => (
                    <Link key={i} to={btn.to} className={`btn btn--${btn.variant}`}>
                        {btn.text}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;

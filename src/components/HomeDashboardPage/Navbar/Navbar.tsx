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

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const links = [
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/knowledge', label: 'Knowledge Library' },
        { to: '/market', label: 'Market' },
        { to: '/news-alerts', label: 'News Alerts' },
    ];

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

                <div className="navbar__brand" onClick={() => navigate('/dashboard')}>
                    <img src={logo} alt="LionTrade" className="navbar__logo" />
                    <span className="navbar__title">LionTrade</span>
                </div>
            </div>

            <div className={`navbar__center ${mobileOpen ? 'open' : ''}`}>
                {links.map(l => (
                    <NavLink
                        key={l.to}
                        to={l.to}
                        className={({ isActive }) => (isActive ? 'navbar__link active' : 'navbar__link')}
                        onClick={() => setMobileOpen(false)}
                    >
                        {l.label}
                    </NavLink>
                ))}

                <div className="navbar__search">
                    <input
                        type="text"
                        placeholder="Search stocks, news..."
                        onKeyDown={e => e.key === 'Enter' && console.log('Search:', e.currentTarget.value)}
                    />
                </div>
            </div>

            <div className="navbar__right">
                <button className="navbar__icon-btn" onClick={() => console.log('Notifications')}>
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
                            <button onClick={() => navigate('/profile')}>Profile</button>
                            <button onClick={() => navigate('/settings')}>Settings</button>
                            <button onClick={() => navigate('/login')}>Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

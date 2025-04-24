import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import userAvatar from '../../../assets/home-page/user-avatar.png';
import {
    MdDashboard,
    MdMenuBook,
    MdBarChart,
    MdNotifications,
    MdSettings,
    MdHelpOutline,
    MdChevronLeft,
    MdChevronRight,
} from 'react-icons/md';

const Sidebar: React.FC = () => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const mainLinks = [
        { to: '/dashboard', label: 'HomeDashboardPage', icon: <MdDashboard /> },
        { to: '/knowledge', label: 'Knowledge Library', icon: <MdMenuBook /> },
        { to: '/summaries', label: 'Market Summaries', icon: <MdBarChart /> },
        { to: '/news-alerts', label: 'News Alerts', icon: <MdNotifications /> },
    ];

    const supportLinks = [
        { to: '/settings', label: 'Settings', icon: <MdSettings /> },
        { to: '/help-feedback', label: 'Help & Feedback', icon: <MdHelpOutline /> },
    ];

    return (
        <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
            <button
                className="sidebar__toggle"
                onClick={() => setCollapsed(!collapsed)}
                aria-label={collapsed ? 'Rozwiń' : 'Zwiń'}
            >
                {collapsed ? <MdChevronRight /> : <MdChevronLeft />}
            </button>

            <div className="sidebar__user">
                <img src={userAvatar} alt="Avatar" className="sidebar__avatar" />
                {!collapsed && (
                    <div className="sidebar__user-info">
                        <span className="sidebar__username">Jane Smith</span>
                        <span className="sidebar__role">Investor</span>
                    </div>
                )}
            </div>

            <nav className="sidebar__nav">
                <div className="sidebar__section-title">{!collapsed && 'Main'}</div>
                <ul>
                    {mainLinks.map(({ to, label, icon }) => (
                        <li key={to}>
                            <Link to={to} className={location.pathname === to ? 'active' : ''}>
                                <div className="sidebar__icon">{icon}</div>
                                {!collapsed && <span className="sidebar__label">{label}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="sidebar__section-title">{!collapsed && 'Support'}</div>
                <ul>
                    {supportLinks.map(({ to, label, icon }) => (
                        <li key={to}>
                            <Link to={to} className={location.pathname === to ? 'active' : ''}>
                                <div className="sidebar__icon">{icon}</div>
                                {!collapsed && <span className="sidebar__label">{label}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;

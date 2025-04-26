import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import userAvatar from '../../../assets/home-page/user-avatar.png';
import { auth } from '../../../firebaseConfig';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import {
    SIDEBAR_TOGGLE_COLLAPSE,
    SIDEBAR_TOGGLE_EXPAND,
    SIDEBAR_SECTION_MAIN,
    SIDEBAR_SECTION_SUPPORT,
    SIDEBAR_ROLE_LABEL,
    SIDEBAR_AVATAR_ALT,
} from '../../../constants/strings';

import { MAIN_LINKS, SUPPORT_LINKS, SidebarLink } from '../../../constants/HomeDashboardPage/constants_sidebar_links';

const Sidebar: React.FC = () => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const [fullName, setFullName] = useState('User');

    useEffect(() => {
        if (auth.currentUser) {
            setFullName(auth.currentUser.displayName || 'User');
        }
    }, []);

    return (
        <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
            <button
                className="sidebar__toggle"
                onClick={() => setCollapsed(!collapsed)}
                aria-label={collapsed ? SIDEBAR_TOGGLE_EXPAND : SIDEBAR_TOGGLE_COLLAPSE}
            >
                {collapsed ? <MdChevronRight /> : <MdChevronLeft />}
            </button>

            <div className="sidebar__user">
                <img src={userAvatar} alt={SIDEBAR_AVATAR_ALT} className="sidebar__avatar" />
                {!collapsed && (
                    <div className="sidebar__user-info">
                        <span className="sidebar__username">{fullName}</span>
                        <span className="sidebar__role">{SIDEBAR_ROLE_LABEL}</span>
                    </div>
                )}
            </div>

            <nav className="sidebar__nav">
                <div className="sidebar__section-title">{!collapsed && SIDEBAR_SECTION_MAIN}</div>
                <ul>
                    {MAIN_LINKS.map((link: SidebarLink) => (
                        <li key={link.to}>
                            <Link
                                to={link.to}
                                className={location.pathname === link.to ? 'active' : ''}
                                onClick={() => collapsed && setCollapsed(false)}
                            >
                                <div className="sidebar__icon">{React.createElement(link.icon)}</div>
                                {!collapsed && <span className="sidebar__label">{link.label}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="sidebar__section-title">{!collapsed && SIDEBAR_SECTION_SUPPORT}</div>
                <ul>
                    {SUPPORT_LINKS.map((link: SidebarLink) => (
                        <li key={link.to}>
                            <Link
                                to={link.to}
                                className={location.pathname === link.to ? 'active' : ''}
                                onClick={() => collapsed && setCollapsed(false)}
                            >
                                <div className="sidebar__icon">{React.createElement(link.icon)}</div>
                                {!collapsed && <span className="sidebar__label">{link.label}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;

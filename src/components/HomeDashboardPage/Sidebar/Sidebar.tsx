import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import userAvatar from '../../../assets/home-page/user-avatar.png';
import { auth } from '../../../firebaseConfig';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { MAIN_LINKS, SUPPORT_LINKS, SidebarLink } from '../../../constants/HomeDashboardPage/constants_sidebar_links';

const Sidebar: React.FC = () => {
    const { t } = useTranslation('home_dashboard_sidebar');
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
                onClick={() => setCollapsed(c => !c)}
                aria-label={collapsed ? t('toggle_expand') : t('toggle_collapse')}
            >
                {collapsed ? <MdChevronRight /> : <MdChevronLeft />}
            </button>

            <div className="sidebar__user">
                <img src={userAvatar} alt={t('avatar_alt')} className="sidebar__avatar" />
                {!collapsed && (
                    <div className="sidebar__user-info">
                        <span className="sidebar__username">{fullName}</span>
                        <span className="sidebar__role">{t('role_label')}</span>
                    </div>
                )}
            </div>

            <nav className="sidebar__nav">
                {!collapsed && <div className="sidebar__section-title">{t('section_main')}</div>}
                <ul>
                    {MAIN_LINKS.map((link: SidebarLink) => (
                        <li key={link.to}>
                            <Link
                                to={link.to}
                                className={location.pathname === link.to ? 'active' : ''}
                                onClick={() => collapsed && setCollapsed(false)}
                            >
                                <div className="sidebar__icon">{React.createElement(link.icon)}</div>
                                {!collapsed && <span className="sidebar__label">{t(link.labelKey)}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>

                {!collapsed && <div className="sidebar__section-title">{t('section_support')}</div>}
                <ul>
                    {SUPPORT_LINKS.map((link: SidebarLink) => (
                        <li key={link.to}>
                            <Link
                                to={link.to}
                                className={location.pathname === link.to ? 'active' : ''}
                                onClick={() => collapsed && setCollapsed(false)}
                            >
                                <div className="sidebar__icon">{React.createElement(link.icon)}</div>
                                {!collapsed && <span className="sidebar__label">{t(link.labelKey)}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;

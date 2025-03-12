import React from 'react';
import './Sidebar.css';
import userAvatar from '../../../assets/home-page/user-avatar.png';

import { MdDashboard, MdInsights, MdTrendingUp } from 'react-icons/md';
import { RiRobot2Fill } from 'react-icons/ri';

const Sidebar: React.FC = () => {
    const navLinks = [
        { href: '#dashboard', label: 'Dashboard', icon: <MdDashboard /> },
        {
            href: '#market-overview',
            label: 'Market Overview',
            icon: <MdInsights />,
        },
        {
            href: '#ai-predictions',
            label: 'AI Predictions',
            icon: <RiRobot2Fill />,
        },
        {
            href: '#my-investments',
            label: 'My Investments',
            icon: <MdTrendingUp />,
        },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar__user">
                <img src={userAvatar} alt="User Avatar" className="sidebar__avatar" />
                <div>
                    <h3 className="sidebar__username">Jane Smith</h3>
                    <p className="sidebar__role">Investor</p>
                </div>
            </div>

            <nav className="sidebar__nav">
                <ul>
                    {navLinks.map((link, idx) => (
                        <li key={idx}>
                            <a href={link.href}>
                                <span className="sidebar__icon">{link.icon}</span>
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;

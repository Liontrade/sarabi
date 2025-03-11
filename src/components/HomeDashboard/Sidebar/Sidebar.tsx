import React from 'react';
import './Sidebar.css';
import userAvatar from '../../../assets/home-page/user-avatar.png';

const Sidebar: React.FC = () => {
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
          <li><a href="#dashboard" className="active">Dashboard</a></li>
          <li><a href="#market-overview">Market Overview</a></li>
          <li><a href="#ai-predictions">AI Predictions</a></li>
          <li><a href="#my-investments">My Investments</a></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

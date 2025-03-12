import React from 'react';
import Navbar from '../../components/HomeDashboard/Navbar/Navbar';
import Sidebar from '../../components/HomeDashboard/Sidebar/Sidebar';
import DepositButton from '../../components/HomeDashboard/DepositButton/DepositButton';
import MetricCard from '../../components/HomeDashboard/MetricCard/MetricCard';
import TrendingStocksSection from '../../components/HomeDashboard/TrendingStocksSection/TrendingStocksSection';
import NotificationItem from '../../components/HomeDashboard/NotificationItem/NotificationItem';

import './Dashboard.css';
import HotNewsSection from '../../components/HomeDashboard/HotNewsSection/HotNewsSection';
import Footer from '../../components/HomeDashboard/Footer/Footer';

const Dashboard: React.FC = () => {
  const metrics = [
    { value: '$3,000', label: 'Portfolio Value' },
    { value: '$1,500', label: 'Cash Balance' },
    { value: '20%', label: 'Daily Change' },
  ];

  const notifications = [
    {
      title: 'AAPL +5%',
      description: 'Your investment in Apple increased by 5%',
      time: '3 mins ago',
    },
    {
      title: 'MSFT Dividend',
      description: 'You received a $15 dividend from Microsoft',
      time: '1 hour ago',
    },
    {
      title: 'TSLA +3%',
      description: 'Tesla stock increased by 3%',
      time: 'Today',
    },
  ];

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="dashboard-page__layout">
        <Sidebar />
        <main className="dashboard-page__content">
          <div className="dashboard-header">
            <h2 className="dashboard-page__title">Dashboard</h2>
            <DepositButton onClick={() => console.log('Deposit clicked')} />
          </div>
          <div className="metrics-row">
            {metrics.map((m, idx) => (
              <MetricCard key={idx} value={m.value} label={m.label} />
            ))}
          </div>
          <HotNewsSection />
          <TrendingStocksSection />

          <section className="dashboard-page__notifications">
            <h3 className="section-heading">Notifications</h3>
            <div className="notifications__list">
              {notifications.map((n, idx) => (
                <NotificationItem
                  key={idx}
                  title={n.title}
                  description={n.description}
                  time={n.time}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;

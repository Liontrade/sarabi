import React from 'react';

import marketImg from '../../assets/home-page/market-overwiew.jpg';
import aiImg from '../../assets/home-page/ai-overwiew.jpg';
import investImg from '../../assets/home-page/my-investments.jpg';
import newsImg from '../../assets/home-page/news-alert.jpg';

import './Dashboard.css';
import Sidebar from '../../components/HomeDashboard/Sidebar/Sidebar';
import QuickAccessCard from '../../components/HomeDashboard/QuickAccessCard/QuickAccessCard';
import NotificationItem from '../../components/HomeDashboard/NotificationItem/NotificationItem';
import Navbar from '../../components/HomeDashboard/Navbar/Navbar';
import DepositButton from '../../components/HomeDashboard/DepositButton/DepositButton';
import MetricCard from '../../components/HomeDashboard/MetricCard/MetricCard';

const Dashboard: React.FC = () => {
  const metrics = [
    { value: '$3,000', label: 'Portfolio Value' },
    { value: '$1,500', label: 'Cash Balance' },
    { value: '20%', label: 'Daily Change' },
  ];

  const quickAccessItems = [
    {
      image: marketImg,
      title: 'Market Overview',
      description: 'View real-time market data',
    },
    {
      image: aiImg,
      title: 'AI Predictions',
      description: 'Explore advanced analytics',
    },
    {
      image: investImg,
      title: 'My Investments',
      description: 'Track your investments',
    },
    {
      image: newsImg,
      title: 'Market News/Alerts',
      description: 'Stay informed with updates',
    },
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
          <section className="dashboard-page__quick-access">
            <h3 className="section-heading">Quick Access</h3>
            <div className="quick-access__grid">
              {quickAccessItems.map((item, index) => (
                <QuickAccessCard
                  key={index}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  onClick={() => console.log(`Navigating to ${item.title}...`)}
                />
              ))}
            </div>
          </section>

          <section className="dashboard-page__notifications">
            <h3 className="section-heading">Notifications</h3>
            <div className="notifications__list">
              {notifications.map((notif, idx) => (
                <NotificationItem
                  key={idx}
                  title={notif.title}
                  description={notif.description}
                  time={notif.time}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

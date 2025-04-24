import React from 'react';
import Navbar from '../../components/HomeDashboard/Navbar/Navbar';
import Sidebar from '../../components/HomeDashboard/Sidebar/Sidebar';
import RecommendedSection from '../../components/HomeDashboard/RecommendedSection/RecommendedSection';
import OnboardingSection from '../../components/HomeDashboard/OnBoardingSection/OnBoardingSection';
import TrendingStocksSection from '../../components/HomeDashboard/TrendingStocksSection/TrendingStocksSection';
import HotNewsSection from '../../components/HomeDashboard/HotNewsSection/HotNewsSection';
import Footer from '../../components/HomeDashboard/Footer/Footer';
import './Dashboard.css';

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard-page">
            <Navbar />
            <div className="dashboard-page__layout">
                <Sidebar />
                <main className="dashboard-page__content">
                    <div className="dashboard-header">
                        <h2 className="dashboard-page__title">Dashboard</h2>
                    </div>

                    <OnboardingSection />

                    <RecommendedSection />

                    <TrendingStocksSection />

                    <HotNewsSection />
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;

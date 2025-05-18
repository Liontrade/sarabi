import React from 'react';
import Navbar from '../../components/HomeDashboardPage/Navbar/Navbar';
import Sidebar from '../../components/HomeDashboardPage/Sidebar/Sidebar';
import RecommendedSection from '../../components/HomeDashboardPage/RecommendedSection/RecommendedSection';
import OnboardingSection from '../../components/HomeDashboardPage/OnBoardingSection/OnBoardingSection';
import TrendingStocksSection from '../../components/HomeDashboardPage/TrendingStocksSection/TrendingStocksSection';
import HotNewsSection from '../../components/HomeDashboardPage/HotNewsSection/HotNewsSection';
import Footer from '../../components/HomeDashboardPage/Footer/Footer';
import './HomeDashboardPage.css';

const HomeDashboardPage: React.FC = () => {
    return (
        <div className="dashboard-page">
            <Navbar />
            <div className="dashboard-page__layout">
                <Sidebar />
                <main className="dashboard-page__content">
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

export default HomeDashboardPage;

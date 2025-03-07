import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import WhyLionTrade from '../components/WhyLionTrade/WhyLionTrade';
import './LandingPage.css';
import LiveMarketInsights from "../components/LiveMarketInsights/LiveMarketInsights.tsx";
import AIPredictions from "../components/AIPredictions/AIPredictions.tsx";
import PricingPlans from "../components/PricingPlans/PricingPlans.tsx";
import Footer from "../components/Footer/Footer.tsx";
import JoinCTA from "../components/JoinCTA/JoinCTA.tsx";

const LandingPage: React.FC = () => {
    return (
        <div className="landing-page">
            <Navbar />
            <main>
                <Hero />
                <WhyLionTrade />
                <LiveMarketInsights />
                <AIPredictions />
                <PricingPlans />
                <JoinCTA />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;

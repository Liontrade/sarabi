import React from 'react';
import Navbar from '../components/LandingPage/Navbar/Navbar';
import Hero from '../components/LandingPage/Hero/Hero';
import WhyLionTrade from '../components/LandingPage/WhyLionTrade/WhyLionTrade';
import './LandingPage.css';
import LiveMarketInsights from '../components/LandingPage/LiveMarketInsights/LiveMarketInsights';
import AIPredictions from '../components/LandingPage/AIPredictions/AIPredictions';
import PricingPlans from '../components/LandingPage/PricingPlans/PricingPlans';
import Footer from '../components/LandingPage/Footer/Footer';
import JoinCTA from '../components/LandingPage/JoinCTA/JoinCTA';

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

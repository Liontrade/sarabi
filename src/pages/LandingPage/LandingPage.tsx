import React from 'react';
import Navbar from '../../components/LandingPage/Navbar/Navbar';
import Hero from '../../components/LandingPage/Hero/Hero';
import JoinCTA from '../../components/LandingPage/JoinCTA/JoinCTA';
import Footer from '../../components/LandingPage/Footer/Footer';
import KeyBenefits from '../../components/LandingPage/KeyBenefits/KeyBenefits';
import PricingPlans from '../../components/LandingPage/PricingPlans/PricingPlans';
import HowItWorks from '../../components/LandingPage/HowItWorks/HowItWorks';
import './LandingPage.css';

const LandingPage: React.FC = () => (
    <div className="landing-page">
        <Navbar />
        <main>
            <Hero />
            <KeyBenefits />
            <PricingPlans />
            <HowItWorks />
            <JoinCTA />
        </main>
        <Footer />
    </div>
);

export default LandingPage;

import React from 'react';
import './PricingPlans.css';

const PricingPlans: React.FC = () => {
    return (
        <section className="pricing-plans" id={'pricing-plans'}>
            <h2 className="section-title">Pricing & Plans</h2>
            <p className="pricing-plans__intro">Join thousands of investors optimizing their portfolios with AI!</p>
            <div className="pricing-plans__cards">
                <div className="pricing-plans__card">
                    <h3>Free Plan</h3>
                    <p className="pricing-plans__price">$0/month</p>
                    <ul className="pricing-plans__features">
                        <li>Basic Market Insights</li>
                        <li>Limited AI Predictions</li>
                        <li>Email Support</li>
                    </ul>
                    <button className="btn pricing-plans__btn">Get Started</button>
                </div>
                <div className="pricing-plans__card">
                    <h3>Premium Plan</h3>
                    <p className="pricing-plans__price">$29/month</p>
                    <ul className="pricing-plans__features">
                        <li>Advanced Market Insights</li>
                        <li>Unlimited AI Predictions</li>
                        <li>Priority Support</li>
                    </ul>
                    <button className="btn pricing-plans__btn">Join Now</button>
                </div>
            </div>
        </section>
    );
};

export default PricingPlans;

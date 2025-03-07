import React from 'react';
import './WhyLionTrade.css';

const WhyLionTrade: React.FC = () => {
    return (
        <section className="why-liontrade" id="why-liontrade">
            <h2 className="section-title">Why LionTrade?</h2>
            <div className="why-liontrade__grid">
                <div className="why-liontrade__card">
                    <h3>AI-Powered Insights</h3>
                    <p>Get real-time AI-driven market insights.</p>
                </div>
                <div className="why-liontrade__card">
                    <h3>Portfolio Optimization</h3>
                    <p>AI helps rebalance and improve your investments.</p>
                </div>
                <div className="why-liontrade__card">
                    <h3>Custom Alerts</h3>
                    <p>Stay ahead of the market with personalized notifications.</p>
                </div>
                <div className="why-liontrade__card">
                    <h3>Real-Time Data</h3>
                    <p>Live updates and AI-generated analysis.</p>
                </div>
            </div>
        </section>
    );
};

export default WhyLionTrade;

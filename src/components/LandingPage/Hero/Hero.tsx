import React from 'react';
import './Hero.css';
import heroImage from '../../../assets/hero.jpg';

const Hero: React.FC = () => {
  return (
    <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero__overlay">
        <div className="hero__content">
          <h2 className="hero__title">
            AI-Driven Investment Insights at Your Fingertips
          </h2>
          <p className="hero__subtitle">
            Smart stock market predictions and real-time analytics to help you
            invest with confidence.
          </p>
          <div className="hero__buttons">
            <button className="btn hero__btn--primary">
              Start Investing for Free
            </button>
            <button className="btn hero__btn--secondary">
              See How It Works
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

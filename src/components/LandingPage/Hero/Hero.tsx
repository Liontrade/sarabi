import React from 'react';
import './Hero.css';
import heroBg from '../../../assets/hero.jpg';

const Hero: React.FC = () => (
    <section className="hero" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="hero__overlay" />
        <div className="hero__content">
            <h1 className="hero__title">LionTrade — Your AI Stock Market Companion</h1>
            <p className="hero__subtitle">Learn markets, test strategies &amp; build confidence—no jargon, no risk.</p>
            <button className="hero__btn">Start Learning for Free</button>
        </div>
    </section>
);

export default Hero;

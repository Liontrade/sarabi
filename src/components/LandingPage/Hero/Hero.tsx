import React from 'react';
import './Hero.css';
import heroBg from '../../../assets/hero.jpg';
import { useTranslation } from 'react-i18next';

const Hero: React.FC = () => {
    const { t } = useTranslation('landing_hero');

    return (
        <section className="hero" style={{ backgroundImage: `url(${heroBg})` }}>
            <div className="hero__overlay" />
            <div className="hero__content">
                <h1 className="hero__title">{t('title')}</h1>
                <p className="hero__subtitle">{t('subtitle')}</p>
                <button className="hero__btn">{t('cta')}</button>
            </div>
        </section>
    );
};

export default Hero;

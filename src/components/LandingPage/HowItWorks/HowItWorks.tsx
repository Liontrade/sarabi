import React from 'react';
import { FiBookOpen, FiMessageCircle, FiTrendingUp } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import './HowItWorks.css';

const icons = [FiBookOpen, FiMessageCircle, FiTrendingUp] as const;

const HowItWorks: React.FC = () => {
    const { t } = useTranslation('landing_how_it_works');

    return (
        <section id="how-it-works" className="how-it-works">
            <h2 className="section-title">{t('section_title')}</h2>
            <div className="hiw__grid">
                {icons.map((Icon, i) => (
                    <div key={i} className="hiw__card">
                        <Icon className="hiw__icon" />
                        <h3>{t(`step${i + 1}_title`)}</h3>
                        <p>{t(`step${i + 1}_text`)}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;

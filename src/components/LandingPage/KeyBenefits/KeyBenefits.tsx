import React from 'react';
import { FiBookOpen, FiBell, FiBarChart2, FiMessageCircle } from 'react-icons/fi';
import './KeyBenefits.css';
import { useTranslation } from 'react-i18next';

const icons = [FiBookOpen, FiBell, FiBarChart2, FiMessageCircle];

const KeyBenefits: React.FC = () => {
    const { t } = useTranslation('landing_key_benefits');

    return (
        <section id="key-benefits" className="key-benefits">
            <h2 className="section-title">{t('section_title')}</h2>
            <p className="section-subtitle">{t('section_subtitle')}</p>
            <div className="benefits__grid">
                {icons.map((Icon, i) => (
                    <div key={i} className="benefits__card">
                        <Icon className="benefits__icon" />
                        <h3 className="benefits__title">{t(`benefit_${i + 1}`)}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default KeyBenefits;

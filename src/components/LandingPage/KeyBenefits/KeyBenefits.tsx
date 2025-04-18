import React from 'react';
import {
    FiBookOpen,
    FiBell,
    FiBarChart2,
    FiMessageCircle,
} from 'react-icons/fi';
import './KeyBenefits.css';

import {
    KEY_BENEFITS_SECTION_TITLE,
    KEY_BENEFITS_SECTION_SUBTITLE,
    KEY_BENEFIT_1,
    KEY_BENEFIT_2,
    KEY_BENEFIT_3,
    KEY_BENEFIT_4,
} from '../../../constants/strings';

const icons = [
    FiBookOpen,
    FiBell,
    FiBarChart2,
    FiMessageCircle,
];

const titles = [
    KEY_BENEFIT_1,
    KEY_BENEFIT_2,
    KEY_BENEFIT_3,
    KEY_BENEFIT_4,
];

const KeyBenefits: React.FC = () => (
    <section id="key-benefits" className="key-benefits">
        <h2 className="section-title">{KEY_BENEFITS_SECTION_TITLE}</h2>
        <p className="section-subtitle">{KEY_BENEFITS_SECTION_SUBTITLE}</p>
        <div className="benefits__grid">
            {titles.map((title, i) => {
                const Icon = icons[i];
                return (
                    <div key={i} className="benefits__card">
                        <Icon className="benefits__icon" />
                        <h3 className="benefits__title">{title}</h3>
                    </div>
                );
            })}
        </div>
    </section>
);

export default KeyBenefits;

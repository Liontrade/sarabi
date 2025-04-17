import React from 'react';
import { FiBookOpen, FiMessageCircle, FiTrendingUp } from 'react-icons/fi';
import './HowItWorks.css';
import {
    HOW_IT_WORKS_SECTION_TITLE,
    HOW_IT_WORKS_STEP1_TITLE,
    HOW_IT_WORKS_STEP1_TEXT,
    HOW_IT_WORKS_STEP2_TITLE,
    HOW_IT_WORKS_STEP2_TEXT,
    HOW_IT_WORKS_STEP3_TITLE,
    HOW_IT_WORKS_STEP3_TEXT,
} from '../../../constants/strings';

const icons = [FiBookOpen, FiMessageCircle, FiTrendingUp];
const titles = [
    HOW_IT_WORKS_STEP1_TITLE,
    HOW_IT_WORKS_STEP2_TITLE,
    HOW_IT_WORKS_STEP3_TITLE,
];
const texts = [
    HOW_IT_WORKS_STEP1_TEXT,
    HOW_IT_WORKS_STEP2_TEXT,
    HOW_IT_WORKS_STEP3_TEXT,
];

const HowItWorks: React.FC = () => (
    <section className="how-it-works">
        <h2 className="section-title">{HOW_IT_WORKS_SECTION_TITLE}</h2>
        <div className="hiw__grid">
            {titles.map((title, i) => {
                const Icon = icons[i];
                return (
                    <div key={i} className="hiw__card">
                        <Icon className="hiw__icon" />
                        <h3>{title}</h3>
                        <p>{texts[i]}</p>
                    </div>
                );
            })}
        </div>
    </section>
);

export default HowItWorks;

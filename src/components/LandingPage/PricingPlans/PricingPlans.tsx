import React from 'react';
import './PricingPlans.css';
import { PRICING_SECTION_ID } from '../../../constants/urls';
import { PRICING_PLANS } from '../../../constants/LandingPage/constants_pricing';
import { useTranslation } from 'react-i18next';

const PricingPlans: React.FC = () => {
    const { t } = useTranslation('landing_pricing_plans');

    return (
        <section className="pricing-plans" id={PRICING_SECTION_ID}>
            <h2 className="section-title">{t('section_title')}</h2>
            <p className="pricing-plans__intro">{t('intro')}</p>

            <div className="pricing-plans__cards">
                {PRICING_PLANS.map((plan, idx) => (
                    <div key={idx} className="pricing-plans__card">
                        <h3>{t(plan.nameKey)}</h3>
                        <p className="pricing-plans__price">{t(plan.priceKey)}</p>
                        <ul className="pricing-plans__features">
                            {plan.featureKeys.map((fk, i) => (
                                <li key={i}>{t(fk)}</li>
                            ))}
                        </ul>
                        <button className="btn pricing-plans__btn">{t(plan.buttonKey)}</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PricingPlans;

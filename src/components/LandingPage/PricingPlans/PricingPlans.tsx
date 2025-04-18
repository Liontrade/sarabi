import React from 'react';
import './PricingPlans.css';
import { PRICING_SECTION_ID } from '../../../constants/urls';
import { PRICING_SECTION_TITLE, PRICING_INTRO } from '../../../constants/strings';
import { PRICING_PLANS } from '../../../constants/LandingPage/constants_pricing';

const PricingPlans: React.FC = () => (
    <section className="pricing-plans" id={PRICING_SECTION_ID}>
        <h2 className="section-title">{PRICING_SECTION_TITLE}</h2>
        <p className="pricing-plans__intro">{PRICING_INTRO}</p>
        <div className="pricing-plans__cards">
            {PRICING_PLANS.map((plan, idx) => (
                <div key={idx} className="pricing-plans__card">
                    <h3>{plan.name}</h3>
                    <p className="pricing-plans__price">{plan.price}</p>
                    <ul className="pricing-plans__features">
                        {plan.features.map((f, i) => (
                            <li key={i}>{f}</li>
                        ))}
                    </ul>
                    <button className="btn pricing-plans__btn">{plan.buttonLabel}</button>
                </div>
            ))}
        </div>
    </section>
);

export default PricingPlans;

import React from 'react';
import './JoinCTA.css';
import {
    JOIN_CTA_TITLE,
    JOIN_CTA_SUBTITLE,
    JOIN_CTA_BUTTON,
} from '../../../constants/strings';
import { JOIN_CTA_ID } from '../../../constants/urls';

const JoinCTA: React.FC = () => (
    <section className="join-cta" id={JOIN_CTA_ID}>
        <div className="join-cta__content">
            <h2 className="join-cta__title">{JOIN_CTA_TITLE}</h2>
            <p className="join-cta__subtitle">{JOIN_CTA_SUBTITLE}</p>
            <button className="btn join-cta__btn">{JOIN_CTA_BUTTON}</button>
        </div>
    </section>
);

export default JoinCTA;

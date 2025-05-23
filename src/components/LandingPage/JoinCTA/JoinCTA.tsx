import React from 'react';
import './JoinCTA.css';
import { JOIN_CTA_ID } from '../../../constants/urls';
import { useTranslation } from 'react-i18next';

const JoinCTA: React.FC = () => {
    const { t } = useTranslation('landing_join_cta');

    return (
        <section className="join-cta" id={JOIN_CTA_ID}>
            <div className="join-cta__content">
                <h2 className="join-cta__title">{t('title')}</h2>
                <p className="join-cta__subtitle">{t('subtitle')}</p>
                <button className="btn join-cta__btn">{t('button')}</button>
            </div>
        </section>
    );
};

export default JoinCTA;

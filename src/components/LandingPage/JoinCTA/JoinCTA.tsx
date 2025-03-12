import React from 'react';
import './JoinCTA.css';

const JoinCTA: React.FC = () => {
    return (
        <section className="join-cta" id={'join-cta'}>
            <div className="join-cta__content">
                <h2 className="join-cta__title">Revolutionize Your Investment Experience</h2>
                <p className="join-cta__subtitle">
                    Join thousands of investors optimizing their portfolios with cutting-edge AI insights.
                </p>
                <button className="btn join-cta__btn">Join Now</button>
            </div>
        </section>
    );
};

export default JoinCTA;

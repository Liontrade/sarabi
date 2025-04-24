import React, { JSX } from 'react';
import './OnboardingSection.css';
import { MdPerson, MdListAlt, MdMenuBook } from 'react-icons/md';

interface Step {
    icon: JSX.Element;
    title: string;
    description: string;
    progress: number;
    cta: { text: string; onClick: () => void };
}

const steps: Step[] = [
    {
        icon: <MdPerson />,
        title: 'Complete your user profile',
        description: 'Help us personalize your experience',
        progress: 80,
        cta: { text: 'Go to profile', onClick: () => console.log('Go to profile') },
    },
    {
        icon: <MdListAlt />,
        title: 'Create your stock watchlist',
        description: 'Keep track of your favorite stocks',
        progress: 20,
        cta: { text: 'Go to watchlist', onClick: () => console.log('Go to watchlist') },
    },
    {
        icon: <MdMenuBook />,
        title: 'Read a lesson in the knowledge library',
        description: 'Learn stock-market basics from A to Z',
        progress: 40,
        cta: { text: 'Go to library', onClick: () => console.log('Go to library') },
    },
];

const OnboardingSection: React.FC = () => {
    const avgProgress = Math.round(steps.reduce((sum, s) => sum + s.progress, 0) / steps.length);

    return (
        <section className="onboarding-section">
            <header className="onboarding-header">
                <h2>Welcome back, Jane!</h2>
                <div className="overview-circle">
                    <div className="radial-progress" style={{ '--percent': `${avgProgress}` } as React.CSSProperties} />
                    <span className="overview-text">{avgProgress}% Completed</span>
                </div>
            </header>

            <div className="steps-grid">
                {steps.map((s, i) => (
                    <div key={i} className="step-card">
                        <div className="step-card__icon">{s.icon}</div>
                        <h3 className="step-card__title">{s.title}</h3>
                        <p className="step-card__desc">{s.description}</p>
                        <div className="step-card__footer">
                            <span className="step-card__badge">{s.progress}%</span>
                            <button className="step-card__btn" onClick={s.cta.onClick}>
                                {s.cta.text}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default OnboardingSection;

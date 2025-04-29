import React, { useEffect, useState } from 'react';
import './OnBoardingSection.css';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '../../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

import { ONBOARDING_WELCOME, ONBOARDING_COMPLETED_SUFFIX } from '../../../constants/strings';
import { ONBOARDING_STEPS, OnboardingStep } from '../../../constants/HomeDashboardPage/constants_on_boarding_section';

const OnboardingSection: React.FC = () => {
    const [userName, setUserName] = useState('User');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
            if (!user) return;
            let name = user.displayName?.split(' ')[0] || '';

            try {
                const snap = await getDoc(doc(db, 'users', user.uid));
                if (snap.exists()) {
                    const data = snap.data() as { name?: string };
                    if (data.name) {
                        name = data.name.split(' ')[0];
                    }
                }
            } catch (err) {
                console.warn('Failed to fetch user data', err);
            }

            setUserName(name || 'User');
        });

        return () => unsubscribe();
    }, []);

    const avgProgress = Math.round(ONBOARDING_STEPS.reduce((sum, s) => sum + s.progress, 0) / ONBOARDING_STEPS.length);

    return (
        <section className="onboarding-section">
            <header className="onboarding-header">
                <h2>
                    {ONBOARDING_WELCOME()}, {userName}!
                </h2>
                <div className="overview-circle">
                    <div className="radial-progress" style={{ '--percent': `${avgProgress}` } as React.CSSProperties} />
                    <span className="overview-text">
                        {avgProgress}
                        {ONBOARDING_COMPLETED_SUFFIX()}
                    </span>
                </div>
            </header>

            <div className="steps-grid">
                {ONBOARDING_STEPS.map((step: OnboardingStep, idx: number) => (
                    <div key={idx} className="step-card">
                        <div className="step-card__icon">{React.createElement(step.icon)}</div>
                        <h3 className="step-card__title">{step.title}</h3>
                        <p className="step-card__desc">{step.description}</p>
                        <div className="step-card__footer">
                            <span className="step-card__badge">{step.progress}%</span>
                            <button className="step-card__btn" onClick={step.cta.onClick}>
                                {step.cta.text}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default OnboardingSection;

import React, { useEffect, useState } from 'react';
import './OnBoardingSection.css';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '../../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import { ONBOARDING_STEPS } from '../../../constants/HomeDashboardPage/constants_on_boarding_section';

const OnboardingSection: React.FC = () => {
    const { t } = useTranslation('home_dashboard_onboarding_section');
    const [userName, setUserName] = useState('User');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
            if (!user) return;
            let name = user.displayName?.split(' ')[0] || '';

            try {
                const snap = await getDoc(doc(db, 'users', user.uid));
                if (snap.exists()) {
                    const data = snap.data() as { name?: string };
                    if (data.name) name = data.name.split(' ')[0];
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
                    {t('welcome')}, {userName}!
                </h2>
                <div className="overview-circle">
                    <div className="radial-progress" style={{ '--percent': `${avgProgress}` } as React.CSSProperties} />
                    <span className="overview-text">
                        {avgProgress}
                        {t('completed_suffix')}
                    </span>
                </div>
            </header>

            <div className="steps-grid">
                {ONBOARDING_STEPS.map((step, idx) => (
                    <div key={idx} className="step-card">
                        <div className="step-card__icon">{React.createElement(step.icon)}</div>
                        <h3 className="step-card__title">{t(step.titleKey)}</h3>
                        <p className="step-card__desc">{t(step.descKey)}</p>
                        <div className="step-card__footer">
                            <span className="step-card__badge">{step.progress}%</span>
                            <button className="step-card__btn" onClick={step.ctaOnClick}>
                                {t(step.ctaKey)}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default OnboardingSection;

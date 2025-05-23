// src/constants/HomeDashboardPage/constants_onboarding_section.ts

import { MdPerson, MdListAlt, MdMenuBook } from 'react-icons/md';
import { IconType } from 'react-icons';

export interface OnboardingStep {
    icon: IconType;
    titleKey: string;
    descKey: string;
    progress: number;
    ctaKey: string;
    ctaOnClick: () => void;
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
    {
        icon: MdPerson,
        titleKey: 'step1_title',
        descKey: 'step1_desc',
        progress: 80,
        ctaKey: 'step1_cta',
        ctaOnClick: () => console.log('Go to profile'),
    },
    {
        icon: MdListAlt,
        titleKey: 'step2_title',
        descKey: 'step2_desc',
        progress: 20,
        ctaKey: 'step2_cta',
        ctaOnClick: () => console.log('Go to watchlist'),
    },
    {
        icon: MdMenuBook,
        titleKey: 'step3_title',
        descKey: 'step3_desc',
        progress: 40,
        ctaKey: 'step3_cta',
        ctaOnClick: () => console.log('Go to library'),
    },
];

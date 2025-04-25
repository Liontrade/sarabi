import { MdPerson, MdListAlt, MdMenuBook } from 'react-icons/md';
import {
    STEP1_TITLE,
    STEP1_DESC,
    STEP1_CTA,
    STEP2_TITLE,
    STEP2_DESC,
    STEP2_CTA,
    STEP3_TITLE,
    STEP3_DESC,
    STEP3_CTA,
} from '../strings';
import { IconType } from 'react-icons';

export interface OnboardingStep {
    icon: IconType;
    title: string;
    description: string;
    progress: number;
    cta: { text: string; onClick: () => void };
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
    {
        icon: MdPerson,
        title: STEP1_TITLE,
        description: STEP1_DESC,
        progress: 80,
        cta: { text: STEP1_CTA, onClick: () => console.log('Go to profile') },
    },
    {
        icon: MdListAlt,
        title: STEP2_TITLE,
        description: STEP2_DESC,
        progress: 20,
        cta: { text: STEP2_CTA, onClick: () => console.log('Go to watchlist') },
    },
    {
        icon: MdMenuBook,
        title: STEP3_TITLE,
        description: STEP3_DESC,
        progress: 40,
        cta: { text: STEP3_CTA, onClick: () => console.log('Go to library') },
    },
];

import {
    KEY_BENEFITS_LABEL,
    PRICING_LABEL,
    HOW_IT_WORKS_LABEL,
    JOIN_CTA_LABEL,
    LOGIN_TEXT,
    SIGNUP_TEXT,
} from '../strings';

import { KEY_BENEFITS_HREF, PRICING_HREF, HOW_IT_WORKS_HREF, JOIN_CTA_HREF, LOGIN_URL, SIGNUP_URL } from '../urls';

// Sekcje “anchor” w głównej nawigacji
export const NAV_LINKS = [
    { text: KEY_BENEFITS_LABEL, href: KEY_BENEFITS_HREF },
    { text: PRICING_LABEL, href: PRICING_HREF },
    { text: HOW_IT_WORKS_LABEL, href: HOW_IT_WORKS_HREF },
    { text: JOIN_CTA_LABEL, href: JOIN_CTA_HREF },
];

export const ACTION_BUTTONS = [
    { text: LOGIN_TEXT, to: LOGIN_URL, variant: 'login' },
    { text: SIGNUP_TEXT, to: SIGNUP_URL, variant: 'signup' },
];

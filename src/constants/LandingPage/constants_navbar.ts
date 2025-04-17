import {
    WHY_LABEL, INSIGHTS_LABEL,
    AI_LABEL, PRICING_LABEL, LEARN_LABEL,
    LOGIN_TEXT, SIGNUP_TEXT
} from '../strings';
import {
    WHY_HREF, INSIGHTS_HREF,
    AI_HREF, PRICING_HREF, LEARN_HREF,
    LOGIN_URL, SIGNUP_URL
} from '../urls';

export const NAV_LINKS = [
    { text: WHY_LABEL,      href: WHY_HREF },
    { text: INSIGHTS_LABEL, href: INSIGHTS_HREF },
    { text: AI_LABEL,       href: AI_HREF },
    { text: PRICING_LABEL,  href: PRICING_HREF },
    { text: LEARN_LABEL,    href: LEARN_HREF },
];

export const ACTION_BUTTONS = [
    { text: LOGIN_TEXT,  to: LOGIN_URL,  variant: 'login' },
    { text: SIGNUP_TEXT, to: SIGNUP_URL, variant: 'signup' },
];

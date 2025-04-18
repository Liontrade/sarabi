import {
    COMPANY_LABEL,
    FEATURES_LABEL,
    RESOURCES_LABEL,
    LEGAL_LABEL,
    ABOUT_US,
    CAREERS,
    PRESS,
    CONTACT,
    AI_PREDICTIONS,
    LIVE_INSIGHTS,
    PORTFOLIO_MANAGEMENT,
    CUSTOM_ALERTS,
    BLOG,
    TUTORIALS,
    FAQ,
    HELP_CENTER,
    TERMS_OF_SERVICE,
    PRIVACY_POLICY,
    COOKIE_POLICY,
} from '../strings';

import {
    ABOUT_US_URL,
    CAREERS_URL,
    PRESS_URL,
    CONTACT_URL,
    AI_PREDICTIONS_URL,
    LIVE_INSIGHTS_URL,
    PORTFOLIO_MANAGEMENT_URL,
    CUSTOM_ALERTS_URL,
    BLOG_URL,
    TUTORIALS_URL,
    FAQ_URL,
    HELP_CENTER_URL,
    TERMS_OF_SERVICE_URL,
    PRIVACY_POLICY_URL,
    COOKIE_POLICY_URL,
} from '../urls';

export type FooterLink = { label: string; href: string };

export interface FooterColumn {
    title: string;
    links: FooterLink[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
    {
        title: COMPANY_LABEL,
        links: [
            { label: ABOUT_US, href: ABOUT_US_URL },
            { label: CAREERS, href: CAREERS_URL },
            { label: PRESS, href: PRESS_URL },
            { label: CONTACT, href: CONTACT_URL },
        ],
    },
    {
        title: FEATURES_LABEL,
        links: [
            { label: AI_PREDICTIONS, href: AI_PREDICTIONS_URL },
            { label: LIVE_INSIGHTS, href: LIVE_INSIGHTS_URL },
            { label: PORTFOLIO_MANAGEMENT, href: PORTFOLIO_MANAGEMENT_URL },
            { label: CUSTOM_ALERTS, href: CUSTOM_ALERTS_URL },
        ],
    },
    {
        title: RESOURCES_LABEL,
        links: [
            { label: BLOG, href: BLOG_URL },
            { label: TUTORIALS, href: TUTORIALS_URL },
            { label: FAQ, href: FAQ_URL },
            { label: HELP_CENTER, href: HELP_CENTER_URL },
        ],
    },
    {
        title: LEGAL_LABEL,
        links: [
            { label: TERMS_OF_SERVICE, href: TERMS_OF_SERVICE_URL },
            { label: PRIVACY_POLICY, href: PRIVACY_POLICY_URL },
            { label: COOKIE_POLICY, href: COOKIE_POLICY_URL },
        ],
    },
];

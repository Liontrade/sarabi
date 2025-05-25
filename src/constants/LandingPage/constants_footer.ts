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

export type FooterLink = { key: string; href: string };

export interface FooterColumn {
    titleKey: string;
    links: FooterLink[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
    {
        titleKey: 'company_label',
        links: [
            { key: 'about_us', href: ABOUT_US_URL },
            { key: 'careers', href: CAREERS_URL },
            { key: 'press', href: PRESS_URL },
            { key: 'contact', href: CONTACT_URL },
        ],
    },
    {
        titleKey: 'features_label',
        links: [
            { key: 'ai_predictions', href: AI_PREDICTIONS_URL },
            { key: 'live_insights', href: LIVE_INSIGHTS_URL },
            { key: 'portfolio_management', href: PORTFOLIO_MANAGEMENT_URL },
            { key: 'custom_alerts', href: CUSTOM_ALERTS_URL },
        ],
    },
    {
        titleKey: 'resources_label',
        links: [
            { key: 'blog', href: BLOG_URL },
            { key: 'tutorials', href: TUTORIALS_URL },
            { key: 'faq', href: FAQ_URL },
            { key: 'help_center', href: HELP_CENTER_URL },
        ],
    },
    {
        titleKey: 'legal_label',
        links: [
            { key: 'terms_of_service', href: TERMS_OF_SERVICE_URL },
            { key: 'privacy_policy', href: PRIVACY_POLICY_URL },
            { key: 'cookie_policy', href: COOKIE_POLICY_URL },
        ],
    },
];

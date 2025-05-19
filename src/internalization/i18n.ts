import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const namespaces = [
    'common',
    'forgot_password_page',
    'home_dashboard_footer',
    'home_dashboard_hot_news_section',
    'home_dashboard_navbar',
    'home_dashboard_onboarding_section',
    'home_dashboard_recommended_section',
    'home_dashboard_sidebar',
    'home_dashboard_trending_section',
    'landing_footer',
    'landing_hero',
    'landing_how_it_works',
    'landing_join_cta',
    'landing_key_benefits',
    'landing_navbar',
    'landing_pricing_plans',
    'login_page',
    'market_market_filter_bar',
    'market_market_list',
    'sign_up_page',
    'settings_delete_account_modal',
    'settings_interface_settings',
    'settings_legal_help_settings',
    'settings_notification_settings',
    'settings_page',
    'settings_profile_settings',
    'settings_security_settings',
    'sign_up_page',
    'verify_email_page',
];

i18n.use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        supportedLngs: ['en', 'pl'],
        debug: process.env.NODE_ENV === 'development',
        ns: namespaces,
        defaultNS: 'common',
        interpolation: { escapeValue: false },
        detection: {
            lookupLocalStorage: 'i18nextLng',
            order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
            caches: ['localStorage'],
        },
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        react: { useSuspense: true },
    });

export default i18n;

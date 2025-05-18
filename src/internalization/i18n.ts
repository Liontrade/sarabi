import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const namespaces = [
    'common',
    'landing_navbar',
    'landing_footer',
    'landing_hero',
    'landing_key_benefits',
    'landing_pricing_plans',
    'landing_how_it_works',
    'landing_join_cta',
    'login_page',
    'header',
    'footer',
    'pricing',
    'onboarding',
];

i18n.use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: process.env.NODE_ENV === 'development',
        ns: namespaces,
        defaultNS: 'common',
        interpolation: { escapeValue: false },
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        react: { useSuspense: true },
    });

export default i18n;

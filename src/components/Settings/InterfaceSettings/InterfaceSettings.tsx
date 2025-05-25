import React, { useEffect, useState } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import './InterfaceSettings.css';

const InterfaceSettings: React.FC = () => {
    type ThemeType = 'light' | 'dark' | 'system';
    type LanguageType = 'pl' | 'en';

    const { t } = useTranslation('settings_interface_settings');

    const initialTheme = (localStorage.getItem('theme') as ThemeType) || 'light';
    const initialLang = (localStorage.getItem('language') as LanguageType) || 'en';

    const [savedTheme, setSavedTheme] = useState<ThemeType>(initialTheme);
    const [savedLang, setSavedLang] = useState<LanguageType>(initialLang);

    const [theme, setTheme] = useState<ThemeType>(initialTheme);
    const [language, setLanguage] = useState<LanguageType>(initialLang);

    const dirty = theme !== savedTheme || language !== savedLang;

    useEffect(() => {
        if (savedTheme === 'dark') document.body.classList.add('dark');
        else document.body.classList.remove('dark');
        i18n.changeLanguage(savedLang);
    }, [savedTheme, savedLang]);

    const handleSave = () => {
        try {
            localStorage.setItem('theme', theme);
            localStorage.setItem('language', language);

            if (theme === 'dark') document.body.classList.add('dark');
            else document.body.classList.remove('dark');
            i18n.changeLanguage(language);

            setSavedTheme(theme);
            setSavedLang(language);
            toast.success(t('save_success'));
        } catch {
            toast.error(t('save_error'));
        }
    };

    const handleRevert = () => {
        setTheme(savedTheme);
        setLanguage(savedLang);
        toast.info(t('save_success'));
    };

    return (
        <div className="interface-settings">
            <h2>{t('title')}</h2>

            {dirty && <div className="interface-settings__unsaved">{t('unsaved_changes')}</div>}

            <div className="interface-settings__option-group">
                <label>{t('theme_label')}</label>
                <div className="btn-group">
                    {(['light', 'dark', 'system'] as ThemeType[]).map(opt => (
                        <button
                            key={opt}
                            className={`btn-chip ${theme === opt ? 'active' : ''}`}
                            onClick={() => setTheme(opt)}
                        >
                            {opt === 'light'
                                ? t('option_light')
                                : opt === 'dark'
                                  ? t('option_dark')
                                  : t('option_system')}
                        </button>
                    ))}
                </div>
            </div>

            <div className="interface-settings__option-group">
                <label>{t('language_label')}</label>
                <div className="btn-group">
                    {(['en', 'pl'] as LanguageType[]).map(opt => (
                        <button
                            key={opt}
                            className={`btn-chip ${language === opt ? 'active' : ''}`}
                            onClick={() => setLanguage(opt)}
                        >
                            {opt === 'en' ? t('option_english') : t('option_polish')}
                        </button>
                    ))}
                </div>
            </div>

            <div className="interface-settings__buttons">
                <button className="btn btn-primary" onClick={handleSave} disabled={!dirty}>
                    {t('save_button')}
                </button>
                <button className="btn btn-secondary" onClick={handleRevert} disabled={!dirty}>
                    {t('revert_button')}
                </button>
            </div>
        </div>
    );
};

export default InterfaceSettings;

import React, { useEffect, useState } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import './InterfaceSettings.css';

const InterfaceSettings: React.FC = () => {
    type ThemeType = 'light' | 'dark' | 'system';
    type LanguageType = 'pl' | 'en';

    const { t } = useTranslation('settings_interface_settings');

    const storedTheme = (localStorage.getItem('theme') as ThemeType) || 'light';
    const storedLang = (localStorage.getItem('language') as LanguageType) || 'en';

    const [theme, setTheme] = useState<ThemeType>(storedTheme);
    const [language, setLanguage] = useState<LanguageType>(storedLang);

    const dirty = theme !== storedTheme || language !== storedLang;

    useEffect(() => {
        if (storedTheme === 'dark') document.body.classList.add('dark');
        else document.body.classList.remove('dark');
        i18n.changeLanguage(storedLang);
    }, []);

    const handleSave = () => {
        try {
            localStorage.setItem('theme', theme);
            localStorage.setItem('language', language);

            if (theme === 'dark') document.body.classList.add('dark');
            else document.body.classList.remove('dark');
            i18n.changeLanguage(language);

            toast.success(t('save_success'));
        } catch {
            toast.error(t('save_error'));
        }
    };

    const handleRevert = () => {
        setTheme(storedTheme);
        setLanguage(storedLang);
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

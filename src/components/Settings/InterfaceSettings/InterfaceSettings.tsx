import React, { useState } from 'react';
import i18n from 'i18next';
import './InterfaceSettings.css';

const InterfaceSettings: React.FC = () => {
    type ThemeType = 'light' | 'dark' | 'system';
    type LanguageType = 'en' | 'es' | 'pt' | 'pl';
    type CurrencyType = 'usd' | 'eur' | 'gbp';
    type DensityType = 'comfortable' | 'compact';

    const [theme, setTheme] = useState<ThemeType>('light');
    const [language, setLanguage] = useState<LanguageType>('en');
    const [currency, setCurrency] = useState<CurrencyType>('usd');
    const [density, setDensity] = useState<DensityType>('comfortable');

    const handleSave = () => {
        console.log('Saving interface settings:', {
            theme,
            language,
            currency,
            density,
        });
    };

    const handleRevert = () => {
        console.log('Reverting changes');
        setTheme('light');
        setLanguage('en');
        setCurrency('usd');
        setDensity('comfortable');
    };

    return (
        <div className="interface-settings">
            <h2>Interface Settings</h2>

            <div className="interface-settings__option-group">
                <label>Theme</label>
                <div className="btn-group">
                    <button
                        className={`btn-chip ${theme === 'light' ? 'active' : ''}`}
                        onClick={() => setTheme('light')}
                    >
                        Light
                    </button>
                    <button className={`btn-chip ${theme === 'dark' ? 'active' : ''}`} onClick={() => setTheme('dark')}>
                        Dark
                    </button>
                    <button
                        className={`btn-chip ${theme === 'system' ? 'active' : ''}`}
                        onClick={() => setTheme('system')}
                    >
                        System default
                    </button>
                </div>
            </div>

            <div className="interface-settings__option-group">
                <label>Language</label>
                <div className="btn-group">
                    <button
                        className={`btn-chip ${language === 'en' ? 'active' : ''}`}
                        onClick={() => {setLanguage('en');
                            i18n.changeLanguage('en');
                        }}
                    >
                        English
                    </button>
                    <button
                        className={`btn-chip ${language === 'es' ? 'active' : ''}`}
                        onClick={() => {setLanguage('es');
                            i18n.changeLanguage('es');
                        }}
                    >
                        Spanish
                    </button>
                    <button
                        className={`btn-chip ${language === 'pt' ? 'active' : ''}`}
                        onClick={() => {setLanguage('pt')
                            i18n.changeLanguage('pt');
                        }}
                    >
                        Portuguese
                    </button>
                    <button
                        className={`btn-chip ${language === 'pl' ? 'active' : ''}`}
                        onClick={() => {setLanguage('pl')
                            i18n.changeLanguage('pl');
                        }}
                    >
                        Polski
                    </button>
                </div>
            </div>

            <div className="interface-settings__option-group">
                <label>Currency format</label>
                <div className="btn-group">
                    <button
                        className={`btn-chip ${currency === 'usd' ? 'active' : ''}`}
                        onClick={() => setCurrency('usd')}
                    >
                        USD ($)
                    </button>
                    <button
                        className={`btn-chip ${currency === 'eur' ? 'active' : ''}`}
                        onClick={() => setCurrency('eur')}
                    >
                        EUR (€)
                    </button>
                    <button
                        className={`btn-chip ${currency === 'gbp' ? 'active' : ''}`}
                        onClick={() => setCurrency('gbp')}
                    >
                        GBP (£)
                    </button>
                </div>
            </div>

            <div className="interface-settings__option-group">
                <label>Display density</label>
                <div className="btn-group">
                    <button
                        className={`btn-chip ${density === 'comfortable' ? 'active' : ''}`}
                        onClick={() => setDensity('comfortable')}
                    >
                        Comfortable
                    </button>
                    <button
                        className={`btn-chip ${density === 'compact' ? 'active' : ''}`}
                        onClick={() => setDensity('compact')}
                    >
                        Compact
                    </button>
                </div>
            </div>

            <div className="interface-settings__buttons">
                <button className="btn btn-primary" onClick={handleSave}>
                    Save
                </button>
                <button className="btn btn-secondary" onClick={handleRevert}>
                    Revert
                </button>
            </div>
        </div>
    );
};

export default InterfaceSettings;

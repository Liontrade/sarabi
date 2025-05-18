import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MinimalNavbar.css';
import logo from '../../assets/logo_without_background.png';
import { useTranslation } from 'react-i18next';

interface MinimalNavbarProps {
    variant?: 'login' | 'signup' | 'none';
}

const MinimalNavbar: React.FC<MinimalNavbarProps> = ({ variant = 'none' }) => {
    const { t } = useTranslation('common');
    const navigate = useNavigate();

    // Pobieramy teksty z JSON-ów
    const buttonText = variant === 'login' ? t('sign_in') : variant === 'signup' ? t('sign_up') : '';

    const buttonLink = variant === 'login' ? '/login' : variant === 'signup' ? '/signup' : '';

    return (
        <header className="minimal-navbar">
            <div className="minimal-navbar__brand" onClick={() => navigate('/')} role="button" tabIndex={0}>
                <img src={logo} alt={`${t('brand_name')} Logo`} className="minimal-navbar__logo" />
                <h1 className="minimal-navbar__title">{t('brand_name')}</h1>
            </div>

            {variant !== 'none' && (
                <button className="minimal-navbar__button" onClick={() => navigate(buttonLink)}>
                    {buttonText}
                </button>
            )}
        </header>
    );
};

export default MinimalNavbar;

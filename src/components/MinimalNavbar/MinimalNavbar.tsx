import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MinimalNavbar.css';
import logo from '../../assets/logo_without_background.png';

interface MinimalNavbarProps {
    variant?: 'login' | 'signup' | 'none';
}

const MinimalNavbar: React.FC<MinimalNavbarProps> = ({ variant = 'none' }) => {
    const navigate = useNavigate();

    let buttonText = '';
    let buttonLink = '';

    if (variant === 'login') {
        buttonText = 'Sign In';
        buttonLink = '/login';
    } else if (variant === 'signup') {
        buttonText = 'Sign Up';
        buttonLink = '/signup';
    }

    return (
        <header className="minimal-navbar">
            <div className="minimal-navbar__brand" onClick={() => navigate('/')} role="button" tabIndex={0}>
                <img src={logo} alt="LionTrade Logo" className="minimal-navbar__logo" />
                <h1 className="minimal-navbar__title">LionTrade</h1>
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

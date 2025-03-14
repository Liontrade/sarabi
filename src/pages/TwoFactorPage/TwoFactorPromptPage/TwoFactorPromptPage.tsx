import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TwoFactorPromptPage.css';

const TwoFactorPrompt: React.FC = () => {
    const navigate = useNavigate();

    const handleEnable = () => {
        navigate('/twofactor/setup');
    };

    const handleSkip = () => {
        navigate('/dashboard');
    };

    return (
        <div className="twofactor-prompt">
            <h2>Two-Factor Authentication</h2>
            <p>
                For enhanced security, would you like to enable two-factor authentication (2FA)?
            </p>
            <div className="twofactor-prompt__buttons">
                <button className="btn btn-primary" onClick={handleEnable}>
                    Enable 2FA
                </button>
                <button className="btn btn-secondary" onClick={handleSkip}>
                    Skip
                </button>
            </div>
        </div>
    );
};

export default TwoFactorPrompt;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import Spinner from '../../components/Spinner/Spinner';
import MinimalNavbar from '../../components/MinimalNavbar/MinimalNavbar';
import { useTranslation } from 'react-i18next';
import './ForgotPasswordPage.css';

const ForgotPasswordPage: React.FC = () => {
    const { t } = useTranslation('forgot_password_page');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage(t('message_sent'));
            setCountdown(5);
        } catch {
            setError(t('error_generic'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (message && countdown > 0) {
            timer = setTimeout(() => setCountdown(c => c - 1), 1000);
        } else if (message && countdown === 0) {
            navigate('/login');
        }
        return () => clearTimeout(timer);
    }, [message, countdown, navigate]);

    return (
        <div className="forgot-password-page">
            <MinimalNavbar variant="none" />

            <div className="forgot-password-container">
                <h1>{t('title')}</h1>
                <p className="desc">{t('description')}</p>

                <form className="forgot-password-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">{t('email_label')}</label>
                    <input
                        id="email"
                        type="email"
                        placeholder={t('email_placeholder')}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn-reset" disabled={loading}>
                        {loading ? <Spinner /> : t('reset_button')}
                    </button>
                </form>

                {message && (
                    <p className="forgot-password-message">
                        {message} {t('redirecting', { count: countdown })}
                    </p>
                )}
                {error && <p className="forgot-password-error">{error}</p>}

                {message && (
                    <button onClick={() => navigate('/login')} className="btn-back">
                        {t('back_to_login')}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ForgotPasswordPage;

import React, { useState } from 'react';
import './LoginPage.css';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import MinimalNavbar from '../../components/MinimalNavbar/MinimalNavbar';
import { useTranslation } from 'react-i18next';
import { FORGOT_PASSWORD_URL, SIGNUP_URL, DASHBOARD_URL } from '../../constants/urls';

const LoginPage: React.FC = () => {
    const { t } = useTranslation('login_page');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate(DASHBOARD_URL);
        } catch {
            setError(t('invalid_credentials_error'));
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError(null);
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            navigate(DASHBOARD_URL);
        } catch {
            setError(t('invalid_credentials_error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <MinimalNavbar variant="signup" />

            <div className="login-page__content">
                <h1>{t('title')}</h1>

                {error && <p className="login-error">{error}</p>}

                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">{t('email_label')}</label>
                    <input
                        id="email"
                        type="email"
                        placeholder={t('email_placeholder')}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password">{t('password_label')}</label>
                    <input
                        id="password"
                        type="password"
                        placeholder={t('password_placeholder')}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="login-form__submit" disabled={loading}>
                        {loading ? <Spinner /> : t('login_button')}
                    </button>

                    <div className="login-form__or">
                        <span>{t('or_text')}</span>
                    </div>

                    <button
                        type="button"
                        className="login-form__social"
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                    >
                        {loading ? <Spinner /> : t('continue_with_google')}
                    </button>

                    <div className="login-form__links">
                        <Link to={FORGOT_PASSWORD_URL} className="login-form__link">
                            {t('forgot_password_link')}
                        </Link>
                        <span> | </span>
                        <span>
                            {t('dont_have_account_text')}{' '}
                            <Link to={SIGNUP_URL} className="login-form__link">
                                {t('signup_button')}
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;

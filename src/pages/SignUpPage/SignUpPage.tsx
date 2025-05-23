import React, { useState } from 'react';
import './SignUpPage.css';
import { auth } from '../../firebaseConfig';
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { useNavigate, Link } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import MinimalNavbar from '../../components/MinimalNavbar/MinimalNavbar';
import { useTranslation, Trans } from 'react-i18next';
import { VERIFY_EMAIL_URL, DASHBOARD_URL, TERMS_URL, PRIVACY_URL } from '../../constants/urls';

export const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const SignUpPage: React.FC = () => {
    const { t } = useTranslation('sign_up_page');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeat] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(email)) {
            setError(t('valid_email_error'));
            return;
        }
        if (password.length < 8) {
            setError(t('password_min_length_error'));
            return;
        }
        if (password !== repeatPassword) {
            setError(t('password_match_error'));
            return;
        }

        try {
            setLoading(true);
            const uc = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(uc.user);
            navigate(VERIFY_EMAIL_URL);
        } catch (err: unknown) {
            if (err instanceof FirebaseError) {
                if (err.code === 'auth/email-already-in-use') {
                    setError(t('email_already_in_use_error'));
                } else if (err.code === 'auth/invalid-email') {
                    setError(t('invalid_email_format_error'));
                } else {
                    setError(t('generic_signup_error'));
                    console.error(err);
                }
            } else {
                setError(t('unexpected_signup_error'));
                console.error(err);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            await signInWithPopup(auth, new GoogleAuthProvider());
            navigate(DASHBOARD_URL);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-page">
            <MinimalNavbar variant="login" />

            <div className="signup-page__content">
                <h1>{t('title')}</h1>

                <form data-testid="signup-form" className="signup-form" onSubmit={handleSubmit}>
                    {error && (
                        <div role="alert" className="signup-form__error">
                            {error}
                        </div>
                    )}

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

                    <label htmlFor="repeatPassword">{t('repeat_password_label')}</label>
                    <input
                        id="repeatPassword"
                        type="password"
                        placeholder={t('repeat_password_placeholder')}
                        value={repeatPassword}
                        onChange={e => setRepeat(e.target.value)}
                        required
                    />

                    <button type="submit" className="signup-form__submit" disabled={loading}>
                        {loading ? <Spinner /> : t('create_account_button')}
                    </button>

                    <p className="signup-form__info">{t('info_text')}</p>

                    <button
                        type="button"
                        className="signup-form__social"
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                    >
                        {loading ? <Spinner /> : t('signup_social_button')}
                    </button>

                    <p className="signup-form__terms">
                        <Trans
                            i18nKey="terms_text"
                            t={t}
                            components={{
                                terms: <Link to={TERMS_URL} className="link" />,
                                privacy: <Link to={PRIVACY_URL} className="link" />,
                            }}
                        />
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;

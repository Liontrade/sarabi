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
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import MinimalNavbar from '../../components/MinimalNavbar/MinimalNavbar';

import {
    SIGNUP_TITLE,
    CREATE_ACCOUNT_BUTTON,
    SIGNUP_SOCIAL_BUTTON,
    SIGNUP_INFO_TEXT,
    SIGNUP_TERMS_TEXT,
    VALID_EMAIL_ERROR,
    PASSWORD_MIN_LENGTH_ERROR,
    PASSWORD_MATCH_ERROR,
    EMAIL_ALREADY_IN_USE_ERROR,
    INVALID_EMAIL_FORMAT_ERROR,
    GENERIC_SIGNUP_ERROR,
    UNEXPECTED_SIGNUP_ERROR,
} from '../../constants/strings';
import { VERIFY_EMAIL_URL, DASHBOARD_URL } from '../../constants/urls';

export const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const SignUpPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(email)) {
            setError(VALID_EMAIL_ERROR);
            return;
        }
        if (password.length < 8) {
            setError(PASSWORD_MIN_LENGTH_ERROR);
            return;
        }
        if (password !== repeatPassword) {
            setError(PASSWORD_MATCH_ERROR);
            return;
        }

        try {
            setLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(userCredential.user);
            navigate(VERIFY_EMAIL_URL);
        } catch (err: unknown) {
            if (err instanceof FirebaseError) {
                switch (err.code) {
                    case 'auth/email-already-in-use':
                        setError(EMAIL_ALREADY_IN_USE_ERROR);
                        break;
                    case 'auth/invalid-email':
                        setError(INVALID_EMAIL_FORMAT_ERROR);
                        break;
                    default:
                        setError(GENERIC_SIGNUP_ERROR);
                }
            } else {
                setError(UNEXPECTED_SIGNUP_ERROR);
            }
            console.error('Error creating account:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            setLoading(true);
            await signInWithPopup(auth, provider);
            navigate(DASHBOARD_URL);
        } catch (err: unknown) {
            if (err instanceof FirebaseError) {
                console.error('Error during Google sign-in:', err.message);
            } else {
                console.error('Unexpected error during Google sign-in:', err);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-page">
            <MinimalNavbar variant="login" />

            <div className="signup-page__content">
                <h1>{SIGNUP_TITLE}</h1>

                <form data-testid="signup-form" className="signup-form" onSubmit={handleSubmit}>
                    {error && (
                        <div role="alert" className="signup-form__error">
                            {error}
                        </div>
                    )}

                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className={error.includes('email') ? 'input-error' : ''}
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password must be at least 8 characters"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className={error.includes('Password') ? 'input-error' : ''}
                        required
                    />

                    <label htmlFor="repeatPassword">Repeat Password</label>
                    <input
                        id="repeatPassword"
                        type="password"
                        placeholder="Repeat your password"
                        value={repeatPassword}
                        onChange={e => setRepeatPassword(e.target.value)}
                        className={error.includes('match') ? 'input-error' : ''}
                        required
                    />

                    <button type="submit" className="signup-form__submit" disabled={loading}>
                        {loading ? <Spinner /> : CREATE_ACCOUNT_BUTTON}
                    </button>

                    <p className="signup-form__info">{SIGNUP_INFO_TEXT}</p>

                    <button
                        type="button"
                        className="signup-form__social"
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                    >
                        {loading ? <Spinner /> : SIGNUP_SOCIAL_BUTTON}
                    </button>

                    <p className="signup-form__terms">{SIGNUP_TERMS_TEXT}</p>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;

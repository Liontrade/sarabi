import React, { useState } from 'react';
import './LoginPage.css';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import MinimalNavbar from '../../components/MinimalNavbar/MinimalNavbar';

import {
    SIGNIN_TITLE,
    LOGIN_ERROR_INVALID_CREDENTIALS,
    LOGIN_BUTTON,
    OR_TEXT,
    CONTINUE_WITH_GOOGLE,
    FORGOT_PASSWORD_LINK,
    DONT_HAVE_ACCOUNT_TEXT,
    SIGNUP_LINK_TEXT,
} from '../../constants/strings';
import { FORGOT_PASSWORD_URL, SIGNUP_URL, DASHBOARD_URL } from '../../constants/urls';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        console.log('Attempting to log in with email:', email);
        try {
            setLoading(true);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in successfully:', userCredential.user);
            navigate(DASHBOARD_URL);
        } catch (err: unknown) {
            console.error('Error logging in:', err);
            setError(LOGIN_ERROR_INVALID_CREDENTIALS);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError(null);
        const provider = new GoogleAuthProvider();
        console.log('Attempting Google sign in...');
        try {
            setLoading(true);
            const userCredential = await signInWithPopup(auth, provider);
            console.log('Google sign in successful:', userCredential.user);
            navigate(DASHBOARD_URL);
        } catch (err: unknown) {
            console.error('Error during Google sign in:', err);
            setError('Google sign-in failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <MinimalNavbar variant="signup" />

            <div className="login-page__content">
                <h1>{SIGNIN_TITLE}</h1>

                {error && <p className="login-error">{error}</p>}

                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="johndoe@gmail.com"
                        value={email}
                        onChange={e => {
                            console.log('Email changed:', e.target.value);
                            setEmail(e.target.value);
                        }}
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={e => {
                            console.log('Password changed');
                            setPassword(e.target.value);
                        }}
                        required
                    />

                    <button type="submit" className="login-form__submit" disabled={loading}>
                        {loading ? <Spinner /> : LOGIN_BUTTON}
                    </button>

                    <div className="login-form__or">
                        <span>{OR_TEXT}</span>
                    </div>

                    <button
                        type="button"
                        className="login-form__social"
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                    >
                        {loading ? <Spinner /> : CONTINUE_WITH_GOOGLE}
                    </button>

                    <div className="login-form__links">
                        <Link to={FORGOT_PASSWORD_URL} className="login-form__link">
                            {FORGOT_PASSWORD_LINK}
                        </Link>
                        <span> | </span>
                        <span>
                            {DONT_HAVE_ACCOUNT_TEXT}{' '}
                            <Link to={SIGNUP_URL} className="login-form__link">
                                {SIGNUP_LINK_TEXT}
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css';
import { auth } from '../../firebaseConfig';
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import Spinner from '../../components/Spinner/Spinner';
import MinimalNavbar from '../../components/MinimalNavbar/MinimalNavbar';

export const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

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
            setError('Please enter a valid email address.');
            return;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }
        if (password !== repeatPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            setLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(userCredential.user);
            navigate('/verify-email');
        } catch (err: unknown) {
            if (err instanceof FirebaseError) {
                switch (err.code) {
                    case 'auth/email-already-in-use':
                        setError('This email is already registered. Please log in instead.');
                        break;
                    case 'auth/invalid-email':
                        setError('Invalid email format.');
                        break;
                    default:
                        setError('An error occurred. Please try again.');
                }
            } else {
                setError('An unexpected error occurred.');
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
            navigate('/dashboard');
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
                <h1>Create an account</h1>
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
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className={error.includes('email') ? 'input-error' : ''}
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password must be at least 8 characters"
                        className={error.includes('Password') ? 'input-error' : ''}
                        required
                    />

                    <label htmlFor="repeatPassword">Repeat Password</label>
                    <input
                        id="repeatPassword"
                        type="password"
                        value={repeatPassword}
                        onChange={e => setRepeatPassword(e.target.value)}
                        placeholder="Repeat your password"
                        className={error.includes('match') ? 'input-error' : ''}
                        required
                    />

                    <button type="submit" className="signup-form__submit" disabled={loading}>
                        {loading ? <Spinner /> : 'Create Account'}
                    </button>

                    <p className="signup-form__info">Join 10,000+ investors on LionTrade and get a free stock slice</p>

                    <button
                        type="button"
                        className="signup-form__social"
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                    >
                        {loading ? <Spinner /> : 'Sign up with Google'}
                    </button>

                    <p className="signup-form__terms">
                        By creating an account, you agree to LionTrade&#39;s terms of service and privacy policy
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;

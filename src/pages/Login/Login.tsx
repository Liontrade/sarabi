// src/pages/Login/Login.tsx
import React, { useState } from 'react';
import './Login.css';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import MinimalNavbar from '../../components/MinimalNavbar/MinimalNavbar';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Attempting to log in with email:', email);
        try {
            setLoading(true);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in successfully:', userCredential.user);
            navigate('/dashboard');
        } catch (error: unknown) {
            const err = error as Error;
            console.error('Error logging in:', error);
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        console.log('Attempting Google sign in...');
        try {
            setLoading(true);
            const userCredential = await signInWithPopup(auth, provider);
            console.log('Google sign in successful:', userCredential.user);
            navigate('/dashboard');
        } catch (error: unknown) {
            const err = error as Error;
            console.error('Error during Google sign in:', error);
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <MinimalNavbar variant="signup" />

            <div className="login-page__content">
                <h1>Sign in to LionTrade</h1>
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
                        {loading ? <Spinner /> : 'Log In'}
                    </button>

                    <div className="login-form__or">
                        <span>or</span>
                    </div>

                    <button
                        type="button"
                        className="login-form__social"
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                    >
                        {loading ? <Spinner /> : 'Continue with Google'}
                    </button>

                    <div className="login-form__links">
                        <Link to="/forgot-password" className="login-form__link">
                            Forgot Password?
                        </Link>
                        <span> | </span>
                        <span>
                            Don’t have an account?{' '}
                            <Link to="/signup" className="login-form__link">
                                Sign up
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

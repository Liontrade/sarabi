import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import { auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Spinner from '../../components/Spinner/Spinner';
import MinimalNavbar from '../../components/MinimalNavbar/MinimalNavbar';

const SignUp: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== repeatPassword) {
            alert('Passwords do not match!');
            return;
        }
        try {
            setLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(userCredential.user);
            navigate('/verify-email');
        } catch (error: unknown) {
            const err = error as Error;
            console.error('Error creating account:', error);
            console.error(err.message);
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
        } catch (error: unknown) {
            const err = error as Error;
            console.error('Error during Google sin in:', error);
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-page">
            <MinimalNavbar variant="login" />

            <div className="signup-page__content">
                <h1>Create an account</h1>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password must be at least 8 characters"
                        required
                    />

                    <label htmlFor="repeatPassword">Repeat Password</label>
                    <input
                        id="repeatPassword"
                        type="password"
                        value={repeatPassword}
                        onChange={e => setRepeatPassword(e.target.value)}
                        placeholder="Repeat your password"
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

export default SignUp;

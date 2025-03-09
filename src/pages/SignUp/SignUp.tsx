import React, { useState } from 'react';
import './SignUp.css';
import MinimalNavbar from '../../components/MinimalNavbar/MinimalNavabr';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Creating account:', { email, password, repeatPassword });
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
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password must be at least 8 characters"
            required
          />

          <label htmlFor="repeatPassword">Repeat Password</label>
          <input
            id="repeatPassword"
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            placeholder="Repeat your password"
            required
          />

          <button type="submit" className="signup-form__submit">Create Account</button>

          <p className="signup-form__info">
            Join 10,000+ investors on LionTrade and get a free stock slice
          </p>

          <button type="button" className="signup-form__social">
            Sign up with Google
          </button>
          <button type="button" className="signup-form__social">
            Sign up with Apple
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

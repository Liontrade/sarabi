import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import MinimalNavbar from '../../components/MinimalNavbar/MinimalNavabr';

const Login: React.FC = () => {
  const [email, setEmail] = useState('johndoe@gmail.com');
  const [password, setPassword] = useState('');
  useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
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
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-form__submit">Log In</button>

          <div className="login-form__or">
            <span>or</span>
          </div>

          <button type="button" className="login-form__social">Continue with Google</button>
          <button type="button" className="login-form__social">Continue with Apple</button>

          <div className="login-form__links">
            <Link to="/forgot-password" className="login-form__link">
              Forgot Password?
            </Link>
            <span> | </span>
            <span>Don’t have an account? <Link to="/signup" className="login-form__link">Sign up</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

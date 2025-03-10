import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import Spinner from '../../components/Spinner/Spinner';
import './ForgotPassword.css';
import MinimalNavbar from '../../components/MinimalNavbar/MinimalNavbar';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(5);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('A password reset email has been sent to your email address.');
      setRedirectCountdown(5); // rozpocznij countdown
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (message && redirectCountdown > 0) {
      timer = setTimeout(() => {
        setRedirectCountdown(prev => prev - 1);
      }, 1000);
    } else if (message && redirectCountdown === 0) {
      navigate('/login');
    }
    return () => clearTimeout(timer);
  }, [message, redirectCountdown, navigate]);

  return (
    <div className="forgot-password-page">
      <MinimalNavbar variant="none" />

      <div className="forgot-password-container">
        <h1>Forgot Password</h1>
        <p>
          Enter your email address below and we will send you a link to reset your password.
        </p>
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="your-email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="forgot-password-submit" disabled={loading}>
            {loading ? <Spinner /> : 'Reset Password'}
          </button>
        </form>
        {message && (
          <p className="forgot-password-message">
            {message} Redirecting in {redirectCountdown} seconds...
          </p>
        )}
        {error && <p className="forgot-password-error">{error}</p>}
        {message && (
          <button
            onClick={() => navigate('/login')}
            className="forgot-password-back"
          >
            Back to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

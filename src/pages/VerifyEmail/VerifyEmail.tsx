import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import { sendEmailVerification } from 'firebase/auth';
import './VerifyEmail.css';
import MinimalNavbar from '../../components/MinimalNavbar/MinimalNavbar';

const VerifyEmail: React.FC = () => {
    const navigate = useNavigate();

    const handleResend = async () => {
        if (auth.currentUser && !auth.currentUser.emailVerified) {
            try {
                await sendEmailVerification(auth.currentUser);
                alert('Verification email has been sent again.');
            } catch (error: unknown) {
                const err = error as Error;
                console.error('Error resending email:', error);
                console.error(err.message);
            }
        }
    };

    useEffect(() => {
        const intervalId = setInterval(async () => {
            if (auth.currentUser) {
                await auth.currentUser.reload();
                if (auth.currentUser.emailVerified) {
                    clearInterval(intervalId);
                    navigate('/twofactor/prompt');
                }
            }
        }, 3000);

        return () => clearInterval(intervalId);
    }, [navigate]);

    return (
        <div className="verify-email-page">
            <MinimalNavbar variant="none" />
            <div className="verify-email-page__container">
                <h1>Verify Your Email</h1>
                <p>
                    A verification email has been sent to <strong>{auth.currentUser?.email}</strong>. Please check your
                    inbox and click on the verification link. This page will automatically update once your email is
                    verified.
                </p>
                <button onClick={handleResend} className="verify-email__btn">
                    Resend Email
                </button>
            </div>
        </div>
    );
};

export default VerifyEmail;

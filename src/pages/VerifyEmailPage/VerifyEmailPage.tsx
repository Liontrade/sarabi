import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import { sendEmailVerification } from 'firebase/auth';
import './VerifyEmailPage.css';
import MinimalNavbar from '../../components/MinimalNavbar/MinimalNavbar';

import {
    VERIFY_EMAIL_TITLE,
    VERIFY_EMAIL_INFO_PART1,
    VERIFY_EMAIL_INFO_PART2,
    RESEND_EMAIL_BUTTON_TEXT,
    VERIFY_EMAIL_SENT_AGAIN_ALERT,
} from '../../constants/strings';
import { DASHBOARD_URL } from '../../constants/urls';

const VerifyEmailPage: React.FC = () => {
    const navigate = useNavigate();

    const handleResend = async () => {
        if (auth.currentUser && !auth.currentUser.emailVerified) {
            try {
                await sendEmailVerification(auth.currentUser);
                alert(VERIFY_EMAIL_SENT_AGAIN_ALERT);
            } catch (err: unknown) {
                console.error('Error resending email:', err);
            }
        }
    };

    useEffect(() => {
        const intervalId = setInterval(async () => {
            if (auth.currentUser) {
                await auth.currentUser.reload();
                if (auth.currentUser.emailVerified) {
                    clearInterval(intervalId);
                    navigate(DASHBOARD_URL);
                }
            }
        }, 3000);

        return () => clearInterval(intervalId);
    }, [navigate]);

    return (
        <div className="verify-email-page">
            <MinimalNavbar variant="none" />
            <div className="verify-email-page__container">
                <h1>{VERIFY_EMAIL_TITLE}</h1>
                <p>
                    {VERIFY_EMAIL_INFO_PART1} <strong>{auth.currentUser?.email}</strong>. {VERIFY_EMAIL_INFO_PART2}
                </p>
                <button onClick={handleResend} className="verify-email__btn">
                    {RESEND_EMAIL_BUTTON_TEXT}
                </button>
            </div>
        </div>
    );
};

export default VerifyEmailPage;

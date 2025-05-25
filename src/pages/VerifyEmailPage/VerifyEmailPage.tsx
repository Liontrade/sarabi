import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import { sendEmailVerification } from 'firebase/auth';
import './VerifyEmailPage.css';
import MinimalNavbar from '../../components/MinimalNavbar/MinimalNavbar';
import { useTranslation } from 'react-i18next';
import { DASHBOARD_URL } from '../../constants/urls';

const VerifyEmailPage: React.FC = () => {
    const { t } = useTranslation('verify_email_page');
    const navigate = useNavigate();

    const userEmail = auth.currentUser?.email || '';

    const handleResend = async () => {
        if (auth.currentUser && !auth.currentUser.emailVerified) {
            try {
                await sendEmailVerification(auth.currentUser);
                alert(t('resent_alert'));
            } catch (err) {
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
                <h1>{t('title')}</h1>
                <p className="verify-email__info">{t('info', { email: userEmail })}</p>
                <button onClick={handleResend} className="verify-email__btn">
                    {t('resend_button')}
                </button>
            </div>
        </div>
    );
};

export default VerifyEmailPage;

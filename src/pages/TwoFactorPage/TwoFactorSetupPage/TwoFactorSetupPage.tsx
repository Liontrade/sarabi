import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../../firebaseConfig';
import {
    RecaptchaVerifier,
    signInWithPhoneNumber,
    ConfirmationResult,
} from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './TwoFactorSetupPage.css';

// Rozszerzenie globalnego interfejsu dla window
declare global {
    interface Window {
        recaptchaVerifier?: RecaptchaVerifier;
    }
}

// Lista krajów z kodami i flagami
const countries = [
    { code: '+48', name: 'Poland', flag: '🇵🇱' },
    { code: '+1', name: 'USA', flag: '🇺🇸' },
    { code: '+44', name: 'UK', flag: '🇬🇧' },
    { code: '+91', name: 'India', flag: '🇮🇳' },
];

const TwoFactorSetup: React.FC = () => {
    const navigate = useNavigate();
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
    const [loading, setLoading] = useState(false);
    const recaptchaContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log('TwoFactorSetup rendered');
        // W środowisku deweloperskim zamiast wyłączać weryfikację,
        // skonfiguruj numery testowe w konsoli Firebase.
    }, []);

    // Inicjalizacja reCAPTCHA
    const setupRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            try {
                window.recaptchaVerifier = new RecaptchaVerifier(
                    'recaptcha-container',
                    {
                        size: 'invisible',
                        callback: (response: unknown) => {
                            console.log('reCAPTCHA solved:', response);
                        },
                        'expired-callback': () => {
                            console.log('reCAPTCHA expired, resetting...');
                        },
                    },
                    auth
                );
            } catch (error) {
                console.error('Error setting up reCAPTCHA:', error);
            }
        }
    };

    // Łączymy kod kraju z numerem telefonu (usuwa znaki inne niż cyfry)
    const fullPhoneNumber = `${selectedCountry.code}${phoneNumber.replace(/\D/g, '')}`;

    const handleSendCode = async () => {
        if (!phoneNumber.trim()) {
            toast.error('Please enter a valid phone number.');
            return;
        }
        setLoading(true);
        setupRecaptcha();
        try {
            const appVerifier = window.recaptchaVerifier!;
            const confirmation = await signInWithPhoneNumber(auth, fullPhoneNumber, appVerifier);
            setConfirmationResult(confirmation);
            toast.success(`Verification code sent to ${fullPhoneNumber}`);
        } catch (error: unknown) {
            console.error('Error sending code:', error);
            if (error instanceof Error) {
                toast.error(error.message || 'Error sending verification code.');
            } else {
                toast.error('Error sending verification code.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyCode = async () => {
        if (!code.trim()) {
            toast.error('Please enter the verification code.');
            return;
        }
        setLoading(true);
        try {
            if (!confirmationResult) {
                toast.error('No verification process initiated.');
                return;
            }
            await confirmationResult.confirm(code);
            if (auth.currentUser) {
                const userDocRef = doc(db, 'users', auth.currentUser.uid);
                await updateDoc(userDocRef, {
                    twoFactorEnabled: true,
                    phoneNumber: fullPhoneNumber,
                });
                toast.success('2FA enabled successfully');
                navigate('/dashboard');
            }
        } catch (error: unknown) {
            console.error('Error verifying code:', error);
            if (error instanceof Error) {
                toast.error(error.message || 'Incorrect verification code.');
            } else {
                toast.error('Incorrect verification code.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="twofactor-setup">
            <h2>Enable Two-Factor Authentication</h2>
            {!confirmationResult ? (
                <div className="twofactor-setup__form">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <div className="phone-input-container">
                        <select
                            value={selectedCountry.code}
                            onChange={(e) => {
                                const country = countries.find(c => c.code === e.target.value);
                                if (country) setSelectedCountry(country);
                            }}
                        >
                            {countries.map((country) => (
                                <option key={country.code} value={country.code}>
                                    {country.flag} {country.code}
                                </option>
                            ))}
                        </select>
                        <input
                            id="phoneNumber"
                            type="tel"
                            placeholder="e.g. 123456789"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleSendCode} disabled={loading}>
                        {loading ? 'Sending...' : 'Send Code'}
                    </button>
                    <div id="recaptcha-container" ref={recaptchaContainer}></div>
                </div>
            ) : (
                <div className="twofactor-setup__form">
                    <label htmlFor="verificationCode">Verification Code</label>
                    <input
                        id="verificationCode"
                        type="text"
                        placeholder="Enter the code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={handleVerifyCode} disabled={loading}>
                        {loading ? 'Verifying...' : 'Verify Code'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default TwoFactorSetup;

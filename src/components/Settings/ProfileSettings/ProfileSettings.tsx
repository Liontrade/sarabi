import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import './ProfileSettings.css';

const ProfileSettings: React.FC = () => {
    const { t } = useTranslation('settings_profile_settings');
    const currentUser = auth.currentUser;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [nameError, setNameError] = useState('');

    const validateName = (value: string): string | null => {
        const trimmed = value.trim();
        if (!trimmed) {
            return t('name_error_required');
        }
        if (!/^[A-Za-z\s]+$/.test(trimmed)) {
            return t('name_error_format');
        }
        return null;
    };

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.displayName || '');
            setEmail(currentUser.email || '');
        }
    }, [currentUser]);

    const handleSave = async () => {
        const err = validateName(name);
        if (err) {
            setNameError(err);
            return;
        }
        setNameError('');
        try {
            if (currentUser) {
                await updateProfile(currentUser, { displayName: name });
                const userDoc = doc(db, 'users', currentUser.uid);
                await setDoc(userDoc, { name }, { merge: true });
                toast.success(t('save_success'));
            }
        } catch (error: unknown) {
            console.error('Error updating profile:', error);
            const message = error instanceof Error ? error.message : t('save_error');
            toast.error(message);
        }
    };

    return (
        <div className="profile-settings">
            <h2>{t('title')}</h2>
            <p className="profile-settings__desc">{t('description')}</p>

            <div className="profile-settings__fields">
                <label htmlFor="profileName">{t('name_label')}</label>
                <input
                    id="profileName"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onBlur={() => setNameError(validateName(name) || '')}
                    className={nameError ? 'input-error' : ''}
                />
                {nameError && <div className="error-message">{nameError}</div>}

                <label htmlFor="profileEmail">{t('email_label')}</label>
                <input id="profileEmail" type="email" value={email} disabled />
            </div>

            <button className="profile-settings__save-btn" onClick={handleSave}>
                {t('save_button')}
            </button>
        </div>
    );
};

export default ProfileSettings;

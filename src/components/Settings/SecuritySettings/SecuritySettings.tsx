import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebaseConfig';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, deleteUser } from 'firebase/auth';
import { toast } from 'react-toastify';
import DeleteAccountModal from '../DeleteAccountModal/DeleteAccountModal';
import { useTranslation } from 'react-i18next';
import './SecuritySettings.css';

const SecuritySettings: React.FC = () => {
    const { t } = useTranslation('settings_security_settings');
    const navigate = useNavigate();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [currentPasswordError, setCurrentPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const validateCurrentPassword = (v: string) => (!v.trim() ? t('error_current_empty') : '');

    const validateNewPassword = (v: string, curr: string) => {
        if (!v.trim()) return t('error_new_empty');
        if (v.length < 8) return t('error_new_length');
        if (v === curr) return t('error_new_same');
        if (!/^[A-Za-z0-9]+$/.test(v)) return t('error_new_format');
        return '';
    };

    const validateConfirmNewPassword = (newP: string, conf: string) =>
        !conf.trim() ? t('error_confirm_empty') : newP !== conf ? t('error_confirm_mismatch') : '';

    const handleChangePassword = async () => {
        const currErr = validateCurrentPassword(currentPassword);
        const newErr = validateNewPassword(newPassword, currentPassword);
        const confErr = validateConfirmNewPassword(newPassword, confirmNewPassword);

        setCurrentPasswordError(currErr);
        setNewPasswordError(newErr);
        setConfirmPasswordError(confErr);
        if (currErr || newErr || confErr) return;

        try {
            const user = auth.currentUser;
            if (!user || !user.email) {
                toast.error(t('error_no_user'));
                return;
            }
            const cred = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, cred);
            await updatePassword(user, newPassword);
            toast.success(t('password_change_success'));
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        } catch (error: unknown) {
            console.error(error);
            const message = error instanceof Error ? error.message : t('error_unknown');
            toast.error(message);
        }
    };

    const handleToggle2FA = () => {
        setTwoFactorEnabled(f => !f);
        toast.info(twoFactorEnabled ? t('two_fa_disable') : t('two_fa_enable'));
    };

    const openDeleteModal = () => setShowDeleteModal(true);

    const handleDeleteAccount = async (pwd: string) => {
        try {
            const user = auth.currentUser;
            if (!user || !user.email) {
                toast.error(t('error_no_user'));
                return;
            }
            const cred = EmailAuthProvider.credential(user.email, pwd);
            await reauthenticateWithCredential(user, cred);
            await deleteUser(user);
            toast.success(t('delete_success'));
            navigate('/');
        } catch (error: unknown) {
            console.error(error);
            const message = error instanceof Error ? error.message : t('error_unknown');
            toast.error(message);
        }
    };

    return (
        <div className="security-settings">
            <h2>{t('title')}</h2>
            <p className="sec-desc">{t('description')}</p>

            {/* Change Password */}
            <div className="section card">
                <h3>{t('change_password_title')}</h3>
                <div className="form-narrow">
                    <label>{t('change_password_current_label')}</label>
                    <input
                        type="password"
                        placeholder={t('change_password_current_placeholder')}
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                        className={currentPasswordError ? 'input-error' : ''}
                    />
                    {currentPasswordError && <div className="error-message">{currentPasswordError}</div>}

                    <label>{t('change_password_new_label')}</label>
                    <input
                        type="password"
                        placeholder={t('change_password_new_placeholder')}
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        className={newPasswordError ? 'input-error' : ''}
                    />
                    {newPasswordError && <div className="error-message">{newPasswordError}</div>}

                    <label>{t('change_password_confirm_label')}</label>
                    <input
                        type="password"
                        placeholder={t('change_password_confirm_placeholder')}
                        value={confirmNewPassword}
                        onChange={e => setConfirmNewPassword(e.target.value)}
                        className={confirmPasswordError ? 'input-error' : ''}
                    />
                    {confirmPasswordError && <div className="error-message">{confirmPasswordError}</div>}

                    <button className="btn btn-primary" onClick={handleChangePassword}>
                        {t('change_password_button')}
                    </button>
                </div>
            </div>

            <div className="section card">
                <h3>{t('two_fa_title')}</h3>
                <p>{t('two_fa_description')}</p>
                <button className="btn btn-secondary" onClick={handleToggle2FA}>
                    {twoFactorEnabled ? t('two_fa_disable') : t('two_fa_enable')}
                </button>
            </div>

            <div className="section card">
                <h3>{t('account_deletion_title')}</h3>
                <p>{t('account_deletion_description')}</p>
                <button className="btn btn-delete" onClick={openDeleteModal}>
                    {t('account_deletion_button')}
                </button>
            </div>

            {/* Security Tips */}
            <div className="section card">
                <h3>{t('security_tips_title')}</h3>
                <ul className="security-tips">
                    <li>{t('security_tip_phishing')}</li>
                    <li>{t('security_tip_recovery')}</li>
                    <li>{t('security_tip_2fa')}</li>
                </ul>
            </div>

            {showDeleteModal && (
                <DeleteAccountModal
                    onConfirm={pwd => {
                        setShowDeleteModal(false);
                        handleDeleteAccount(pwd);
                    }}
                    onCancel={() => setShowDeleteModal(false)}
                />
            )}
        </div>
    );
};

export default SecuritySettings;

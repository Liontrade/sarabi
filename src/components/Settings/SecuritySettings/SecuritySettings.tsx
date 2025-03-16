import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SecuritySettings.css';
import { auth } from '../../../firebaseConfig';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, deleteUser } from 'firebase/auth';
import { toast } from 'react-toastify';
import DeleteAccountModal from '../DeleteAccountModal/DeleteAccountModal';

interface LoginSession {
    id: string;
    date: string;
    device: string;
    location: string;
}

const SecuritySettings: React.FC = () => {
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [currentPasswordError, setCurrentPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

    const [loginHistory, setLoginHistory] = useState<LoginSession[]>([
        {
            id: 'session1',
            date: 'Jan 3, 2023 12:01pm',
            device: 'Chrome, Windows 10',
            location: 'Seattle, WA',
        },
        {
            id: 'session2',
            date: 'Jan 2, 2023 9:15am',
            device: 'Safari, iOS',
            location: 'San Francisco, CA',
        },
    ]);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const validateCurrentPassword = (value: string) => {
        if (!value.trim()) {
            return 'Current password cannot be empty.';
        }
        return '';
    };

    const validateNewPassword = (value: string, currentVal: string) => {
        if (!value.trim()) {
            return 'New password cannot be empty.';
        }
        if (value.trim().length < 8) {
            return 'New password must be at least 8 characters.';
        }
        if (value === currentVal) {
            return 'New password must be different from current password.';
        }
        const regex = /^[A-Za-z0-9]+$/;
        if (!regex.test(value)) {
            return 'New password can only contain letters and numbers.';
        }
        return '';
    };

    const validateConfirmNewPassword = (newPass: string, confirmPass: string) => {
        if (!confirmPass.trim()) {
            return 'Please confirm your new password.';
        }
        if (newPass !== confirmPass) {
            return 'New passwords do not match.';
        }
        return '';
    };

    const handleChangePassword = async () => {
        const currErr = validateCurrentPassword(currentPassword);
        const newErr = validateNewPassword(newPassword, currentPassword);
        const confErr = validateConfirmNewPassword(newPassword, confirmNewPassword);

        setCurrentPasswordError(currErr);
        setNewPasswordError(newErr);
        setConfirmPasswordError(confErr);

        if (currErr || newErr || confErr) {
            return;
        }

        try {
            if (!auth.currentUser || !auth.currentUser.email) {
                toast.error('No authenticated user or missing email.');
                return;
            }
            const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
            await reauthenticateWithCredential(auth.currentUser, credential);
            await updatePassword(auth.currentUser, newPassword);
            toast.success('Password updated successfully');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        } catch (error: unknown) {
            console.error('Error updating password:', error);
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An unknown error occurred');
            }
        }
    };

    const handleToggle2FA = () => {
        setTwoFactorEnabled(!twoFactorEnabled);
        console.log(twoFactorEnabled ? 'Disabling 2FA...' : 'Enabling 2FA...');
    };

    const handleSignOutSession = (sessionId: string) => {
        console.log('Signing out session:', sessionId);
        setLoginHistory(loginHistory.filter(s => s.id !== sessionId));
    };

    const openDeleteModal = () => {
        setShowDeleteModal(true);
    };

    const handleDeleteAccount = async (passwordForDeletion: string) => {
        try {
            if (!auth.currentUser || !auth.currentUser.email) {
                toast.error('No authenticated user or missing email.');
                return;
            }
            const credential = EmailAuthProvider.credential(auth.currentUser.email, passwordForDeletion);
            await reauthenticateWithCredential(auth.currentUser, credential);
            await deleteUser(auth.currentUser);
            toast.success('Account deleted successfully');
            navigate('/');
        } catch (error: unknown) {
            console.error('Error deleting account:', error);
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An unknown error occurred');
            }
        }
    };

    return (
        <div className="security-settings">
            <h2>Security</h2>
            <p>Stay safe and secure</p>

            <div className="section change-password">
                <h3>Change Password</h3>
                <div className="form-narrow">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input
                        id="currentPassword"
                        type="password"
                        placeholder="Enter current password"
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                        className={currentPasswordError ? 'input-error' : ''}
                    />
                    {currentPasswordError && <div className="error-message">{currentPasswordError}</div>}

                    <label htmlFor="newPassword">New Password</label>
                    <input
                        id="newPassword"
                        type="password"
                        placeholder="At least 8 characters, letters and numbers only"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        className={newPasswordError ? 'input-error' : ''}
                    />
                    {newPasswordError && <div className="error-message">{newPasswordError}</div>}

                    <label htmlFor="confirmNewPassword">Confirm New Password</label>
                    <input
                        id="confirmNewPassword"
                        type="password"
                        placeholder="Re-enter your new password"
                        value={confirmNewPassword}
                        onChange={e => setConfirmNewPassword(e.target.value)}
                        className={confirmPasswordError ? 'input-error' : ''}
                    />
                    {confirmPasswordError && <div className="error-message">{confirmPasswordError}</div>}

                    <button className="btn btn-primary" onClick={handleChangePassword}>
                        Change Password
                    </button>
                </div>
            </div>

            <div className="section two-factor">
                <h3>Two-Factor Authentication (2FA)</h3>
                <p>
                    Add an extra layer of security to your account. When 2FA is enabled, you’ll need to provide a second
                    form of verification in addition to your password.
                </p>
                <button className="btn btn-secondary" onClick={handleToggle2FA}>
                    {twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                </button>
            </div>

            <div className="section login-history">
                <h3>Login History</h3>
                {loginHistory.length === 0 ? (
                    <p>No active sessions.</p>
                ) : (
                    <ul className="session-list">
                        {loginHistory.map(session => (
                            <li key={session.id} className="session-item">
                                <div>
                                    <div className="session-date">{session.date}</div>
                                    <div className="session-info">
                                        {session.device}, {session.location}
                                    </div>
                                </div>
                                <button className="btn btn-signout" onClick={() => handleSignOutSession(session.id)}>
                                    Sign Out
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="section account-deletion">
                <h3>Account Deletion</h3>
                <p>
                    If you delete your account, you won’t be able to recover it. You will lose access to all data,
                    including your portfolio and personal settings.
                </p>
                <button className="btn btn-delete" onClick={openDeleteModal}>
                    Delete Account
                </button>
            </div>

            <div className="section security-tips">
                <h3>Additional Security Tips</h3>
                <ul>
                    <li>Be cautious of phishing emails and links.</li>
                    <li>Keep your recovery codes safe.</li>
                    <li>Always enable 2FA on your critical accounts.</li>
                </ul>
            </div>

            {showDeleteModal && (
                <DeleteAccountModal
                    onConfirm={password => {
                        setShowDeleteModal(false);
                        handleDeleteAccount(password);
                    }}
                    onCancel={() => setShowDeleteModal(false)}
                />
            )}
        </div>
    );
};

export default SecuritySettings;

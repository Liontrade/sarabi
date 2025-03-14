import React, { useState } from 'react';
import './SecuritySettings.css';

interface LoginSession {
    id: string;
    date: string;
    device: string;
    location: string;
}

const SecuritySettings: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

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

    const handleChangePassword = () => {
        if (newPassword !== confirmNewPassword) {
            alert('New passwords do not match!');
            return;
        }
        console.log('Changing password:', { currentPassword, newPassword });
    };

    const handleToggle2FA = () => {
        setTwoFactorEnabled(!twoFactorEnabled);
        console.log(twoFactorEnabled ? 'Disabling 2FA...' : 'Enabling 2FA...');
    };

    const handleSignOutSession = (sessionId: string) => {
        console.log('Signing out session:', sessionId);
        setLoginHistory(loginHistory.filter(s => s.id !== sessionId));
    };

    const handleDeleteAccount = () => {
        const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
        if (confirmed) {
            console.log('Deleting account...');
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
                    />

                    <label htmlFor="newPassword">New Password</label>
                    <input
                        id="newPassword"
                        type="password"
                        placeholder="Password must be at least 8 characters"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                    />

                    <label htmlFor="confirmNewPassword">Confirm New Password</label>
                    <input
                        id="confirmNewPassword"
                        type="password"
                        placeholder="Re-enter your new password"
                        value={confirmNewPassword}
                        onChange={e => setConfirmNewPassword(e.target.value)}
                    />

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
                <button className="btn btn-delete" onClick={handleDeleteAccount}>
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
        </div>
    );
};

export default SecuritySettings;

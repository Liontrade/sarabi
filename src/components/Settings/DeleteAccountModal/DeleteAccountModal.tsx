import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiAlertTriangle, FiEye, FiEyeOff } from 'react-icons/fi';
import './DeleteAccountModal.css';

interface Props {
    onConfirm: (password: string) => void;
    onCancel: () => void;
}

const DeleteAccountModal: React.FC<Props> = ({ onConfirm, onCancel }) => {
    const { t } = useTranslation('settings_delete_account_modal');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="modal-overlay" role="dialog" aria-modal="true">
            <div className="modal-content">
                <header className="modal-header">
                    <FiAlertTriangle className="modal-icon" />
                    <h3>{t('delete_account_title')}</h3>
                </header>
                <p className="modal-warning">{t('delete_account_warning')}</p>

                <label htmlFor="delete-password" className="modal-label">
                    {t('password_label')}
                </label>
                <div className="password-input-wrapper">
                    <input
                        id="delete-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="modal-input"
                        autoFocus
                    />
                    <button
                        type="button"
                        className="eye-toggle"
                        onClick={() => setShowPassword(v => !v)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                </div>

                <div className="modal-buttons">
                    <button className="btn btn-secondary" onClick={onCancel}>
                        {t('cancel_button')}
                    </button>
                    <button className="btn btn-delete" onClick={() => onConfirm(password)} disabled={!password.trim()}>
                        {t('confirm_button')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountModal;

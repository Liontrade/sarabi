import React, { useState } from 'react';
import './DeleteAccountModal.css';

interface DeleteAccountModalProps {
    onConfirm: (password: string) => void;
    onCancel: () => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ onConfirm, onCancel }) => {
    const [password, setPassword] = useState('');

    const handleConfirm = () => {
        onConfirm(password);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Delete Account</h3>
                <p>
                    Are you sure you want to delete your account? This action cannot be undone.
                </p>
                <label htmlFor="delete-password">Enter your current password to confirm:</label>
                <input
                    id="delete-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="modal-buttons">
                    <button className="btn btn-secondary" onClick={onCancel}>
                        Cancel
                    </button>
                    <button className="btn btn-delete" onClick={handleConfirm}>
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountModal;

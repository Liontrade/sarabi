import React from 'react';
import { MdAdd } from 'react-icons/md';
import './DepositButton.css';

interface DepositButtonProps {
    onClick?: () => void;
}

const DepositButton: React.FC<DepositButtonProps> = ({ onClick }) => {
    return (
        <button className="deposit-button" onClick={onClick}>
            <MdAdd className="deposit-button__icon" />
            Make a deposit
        </button>
    );
};

export default DepositButton;

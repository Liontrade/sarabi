import React from 'react';
import { IoArrowForwardOutline } from 'react-icons/io5';
import './NotificationItem.css';

interface NotificationItemProps {
    title: string;
    description: string;
    time?: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ title, description, time }) => {
    return (
        <div className="notification-item">
            <div className="notification-item__left">
                <div className="notification-item__icon-box">
                    <IoArrowForwardOutline className="notification-item__icon" />
                </div>
                <div className="notification-item__content">
                    <h5 className="notification-item__title">{title}</h5>
                    <p className="notification-item__desc">{description}</p>
                </div>
            </div>
            {time && <span className="notification-item__time">{time}</span>}
        </div>
    );
};

export default NotificationItem;

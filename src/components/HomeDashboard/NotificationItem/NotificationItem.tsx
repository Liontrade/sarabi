import React from 'react';
import './NotificationItem.css';

interface NotificationItemProps {
  title: string;
  description: string;
  time?: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
                                                             title,
                                                             description,
                                                             time
                                                           }) => {
  return (
    <div className="notification-item">
      <h5 className="notification-item__title">{title}</h5>
      <p className="notification-item__desc">{description}</p>
      {time && <span className="notification-item__time">{time}</span>}
    </div>
  );
};

export default NotificationItem;

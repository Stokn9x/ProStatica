import React from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/Css/NotifikationMenu.css';

function NotifikationMenu({ currentUser, isOpen, notifications, markAsRead }) {
    const navigate = useNavigate();

    const handleNotificationClick = (notificationId) => {
        markAsRead(notificationId);
        navigate('/inbox');
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="NotifikationMenu">
            <h1 className="menu-header">Notifications</h1>
            <ul>
                {notifications.length > 0 ? (
                    notifications.map(notification => (
                        <li key={notification.id} onClick={() => handleNotificationClick(notification.id)} className="notification-item">
                            <p><strong>{notification.type}</strong></p>
                            <p>{notification.content}</p>
                            <p>From: {notification.sender}</p>
                        </li>
                    ))
                ) : (
                    <p className="no-notifications">No notifications found.</p>
                )}
            </ul>
        </div>
    );
}

export default NotifikationMenu;

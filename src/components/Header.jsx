import React, { useState, useEffect } from 'react';
import '/src/Css/Header.css';
import SearchField from './SearchFIeld.jsx';
import ProfileMenu from './ProfileMenu.jsx';
import friendIcon from '/src/assets/Icon/friend-icon.svg';
import bellIcon from '/src/assets/Icon/bell-icon.svg';
import FriendsMenu from './FriendsMenu.jsx';
import NotifikationMenu from './NotifikationMenu.jsx';

function Header({ currentUser, handleLogout }) {
    const [isFriendsMenuOpen, setIsFriendsMenuOpen] = useState(false);
    const [isNotifikationMenuOpen, setIsNotifikationMenuOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const toggleFriendsMenu = () => {
        setIsFriendsMenuOpen(!isFriendsMenuOpen);
        if (!isFriendsMenuOpen) {
            setIsNotifikationMenuOpen(false);
        }
    };

    const toggleNotifikationMenu = () => {
        setIsNotifikationMenuOpen(!isNotifikationMenuOpen);
        if (!isNotifikationMenuOpen) {
            setIsFriendsMenuOpen(false);
        }
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch(`http://localhost:5001/getNotifications/${currentUser.username}`);
                if (response.ok) {
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        setNotifications(data);
                        const unread = data.filter(notification => !notification.read).length;
                        setUnreadCount(unread);
                    } else {
                        console.error('Expected an array of notifications');
                        setNotifications([]);
                        setUnreadCount(0);
                    }
                } else {
                    console.error('Error fetching notifications:', response.statusText);
                    setNotifications([]);
                    setUnreadCount(0);
                }
            } catch (error) {
                console.error('Failed to fetch notifications:', error);
                setNotifications([]);
                setUnreadCount(0);
            }
        };

        fetchNotifications();
    }, [isNotifikationMenuOpen, currentUser]);

    const markAsRead = async (notificationId) => {
        try {
            const response = await fetch(`http://localhost:5001/markAsRead/${notificationId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setNotifications(prevNotifications =>
                    prevNotifications.map(notification =>
                        notification.id === notificationId ? { ...notification, read: true } : notification
                    )
                );
                setUnreadCount(prevCount => prevCount - 1);
            } else {
                console.error('Error marking notification as read:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
        }
    };

    return (
        <div className="header">
            <div className="header-content">
                <SearchField />
                <div className="right-section">
                    <div className="icons">
                        <button onClick={toggleFriendsMenu}>
                            <img src={friendIcon} alt="Friend Icon" />
                        </button>
                        <button onClick={toggleNotifikationMenu} className="notification-button">
                            <img src={bellIcon} alt="Bell Icon" />
                            {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
                        </button>
                    </div>
                    <NotifikationMenu currentUser={currentUser} isOpen={isNotifikationMenuOpen} notifications={notifications} markAsRead={markAsRead} />
                    <FriendsMenu currentUser={currentUser} isOpen={isFriendsMenuOpen} />
                    <ProfileMenu currentUser={currentUser} handleLogout={handleLogout} />
                </div>
            </div>
        </div>
    );
}

export default Header;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/Css/FriendsMenu.css';

function FriendsMenu({ currentUser, isOpen }) {
    const [friends, setFriends] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFriends = async () => {
            if (isOpen && currentUser) {
                try {
                    const response = await fetch(`http://localhost:5001/getFriends/${currentUser.username}`);
                    if (response.ok) {
                        const data = await response.json();
                        if (Array.isArray(data)) {
                            setFriends(data);
                        } else {
                            console.error('Expected an array of friends');
                            setFriends([]);
                        }
                    } else {
                        console.error('Error fetching friends:', response.statusText);
                        setFriends([]);
                    }
                } catch (error) {
                    console.error('Failed to fetch friends:', error);
                    setFriends([]);
                }
            }
        };

        fetchFriends();
    }, [isOpen, currentUser]);

    const handlePlayerClick = (username) => {
        navigate(`/profile/${username}`);
    };

    if (!isOpen || !currentUser) {
        return null;
    }

    return (
        <div className="friends-list">
            {friends.length > 0 ? (
                friends.map(friend => (
                    <div key={friend.username} className="friend-item" onClick={() => handlePlayerClick(friend.username)}>
                        <img src={friend.profilePic} alt={`${friend.username}'s profile`} />
                        <span>{friend.username}</span>
                    </div>
                ))
            ) : (
                <p className="no-friends">No friends found.</p>
            )}
        </div>
    );
}

export default FriendsMenu;

import React, { useEffect, useState } from 'react';
import './../Css/InboxPage.css';

const InboxPage = ({ currentUser }) => {
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [username, setUsername] = useState(currentUser.username);

    useEffect(() => {
        const fetchFriendRequests = async () => {
            try {
                const friendRequestsResponse = await fetch('http://localhost:5001/getFriendRequests', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username }),
                });

                if (friendRequestsResponse.ok) {
                    const friendRequestsData = await friendRequestsResponse.json();
                    setFriendRequests(friendRequestsData);
                } else {
                    console.error('Failed to fetch friend requests');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchFriendRequests();
    }, [username]);

    const acceptFriendRequest = async (senderUsername) => {
        try {
            const response = await fetch('http://localhost:5001/acceptFriendRequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, senderUsername }),
            });

            if (response.ok) {
                setFriendRequests(prevRequests =>
                    prevRequests.filter(req => req !== senderUsername)
                );
                setFriends(prevFriends => [...prevFriends, senderUsername]);

                await fetch('http://localhost:5001/deleteNotificationBySenderReceiver', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ sender: senderUsername, receiver: username }),
                });
            } else {
                console.error('Failed to accept friend request');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const declineFriendRequest = async (senderUsername) => {
        try {
            const response = await fetch('http://localhost:5001/declineFriendRequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, senderUsername }),
            });

            if (response.ok) {
                setFriendRequests(prevRequests =>
                    prevRequests.filter(req => req !== senderUsername)
                );

                await fetch('http://localhost:5001/deleteNotificationBySenderReceiver', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ sender: senderUsername, receiver: username }),
                });
            } else {
                console.error('Failed to decline friend request');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="inboxPage">
            <h1>Inbox</h1>
            <div className="friendRequests">
                {friendRequests.length > 0 ? (
                    friendRequests.map((request, index) => (
                        <div key={index} className="friendRequest">
                            <h1>{request}</h1>
                            <p>wants to be your friend!</p>
                            <button onClick={() => acceptFriendRequest(request)}>Accept</button>
                            <button onClick={() => declineFriendRequest(request)}>Decline</button>
                        </div>
                    ))
                ) : (
                    <p>No friend requests</p>
                )}
            </div>
        </div>
    );
};

export default InboxPage;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './../Css/Profile.css';
import matchData from './../Data/matches.json';
import FirstLoginModal from './Modal/FirstLoginModal';

const Profile = ({ updateUser, currentUser }) => {
    const [profileUser, setProfileUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { username } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:5001/getUser/${username}`);
                if (response.ok) {
                    const user = await response.json();
                    setProfileUser(user);
                } else {
                    console.error('User not found:', response.statusText);
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchUser();
    }, [username]);

    useEffect(() => {
        if (profileUser && profileUser.firstLogin && profileUser.username === currentUser.username) {
            setShowModal(true);
        }
    }, [profileUser, currentUser]);

    const handleCloseModal = async () => {
        setShowModal(false);
        if (profileUser.firstLogin) {
            try {
                const response = await fetch('http://localhost:5001/updateFirstLogin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username: profileUser.username }),
                });

                if (response.ok) {
                    console.log('First login status updated successfully!');
                    updateUser({ ...profileUser, firstLogin: false });
                } else {
                    console.error('Failed to update first login status:', response.statusText);
                }
            } catch (error) {
                console.error('Failed to update first login status:', error);
            }
        }
    };

    if (!profileUser) {
        return <div>Loading ....</div>;
    }

    const userProfile = {
        stats: {
            matchesPlayed: 100,
            rating: 4.5,
            hsPercentage: "60%",
            kdRatio: 1.2,
            kastPercentage: "70%",
            adr: 85
        }
    };
    const latestMatches = Object.values(matchData.matches).slice(0, 5);

    const isOwnProfile = profileUser.username === currentUser.username;

    return (
        <div className="ProfilePage">
            {showModal && <FirstLoginModal onClose={handleCloseModal} />}

            {/* Header for Profile Picture and Background */}
            <div className="header-container">
                <div className="background-header">
                    <h2>Background Picture</h2>
                    <button>Upload Cover Image</button>
                </div>
                <div className="profile-header">
                    <div className="profile-pic-container">                       
                        <img src={profileUser.profilePic} alt="Profile" className="profile-pic-stats" />
                    </div>
                    <div className="profile-details">
                        <h1 className="username">{profileUser.username}</h1>
                        <div className="stats-overview">Stats Overview</div>
                    </div>
                </div>
            </div>

            <div className="stats-container">
                {/* Stats Box */}
                <div className="stats-box">
                    <h3>Stats</h3>
                    <div className="stats-left">
                        <div className="stat-bar">
                            <p>AIM</p>
                            <div className="bar-container">
                                <div className="bar" style={{ width: '88%' }}></div>
                                <span className="value">88</span>
                            </div>
                        </div>
                        <div className="stat-bar">
                            <p>UTILITY</p>
                            <div className="bar-container">
                                <div className="bar" style={{ width: '52%' }}></div>
                                <span className="value">52</span>
                            </div>
                        </div>
                        <div className="stat-bar">
                            <p>POSITIONING</p>
                            <div className="bar-container">
                                <div className="bar" style={{ width: '49%' }}></div>
                                <span className="value">49</span>
                            </div>
                        </div>
                        <div className="stat-bar">
                            <p>OPENING DUELS</p>
                            <div className="bar-container">
                                <div className="bar negative" style={{ width: '24.9%' }}></div>
                                <span className="value negative">-2.49</span>
                            </div>
                        </div>
                        <div className="stat-bar">
                            <p>CLUTCHING</p>
                            <div className="bar-container">
                                <div className="bar" style={{ width: '90%' }}></div>
                                <span className="value">+11.85</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Win Rate Box */}
                <div className="winrate-box">
                    <h3>Win Rate & Rating</h3>
                    <div className="stats-right">
                        <div className="circle-stat">
                            <p>WIN RATE</p>
                            <div className="circle">
                                <span>53%</span>
                                <small>Good</small>
                            </div>
                        </div>
                        <div className="circle-stat">
                            <p>RATING</p>
                            <div className="circle negative">
                                <span>-1.31</span>
                                <small>Poor</small>
                            </div>
                        </div>
                        <div className="rating-container">
                            <div className="rating">
                                <span>T Rating</span>
                                <div className="rating-value negative">-0.34</div>
                            </div>
                            <div className="rating">
                                <span>CT Rating</span>
                                <div className="rating-value negative">-2.35</div>
                            </div>
                        </div>
                    </div>
                </div>               
            </div>

            {/* Last 5 Matches Box */}
            <div className="matches-box">
                <h3>Last 5 Matches</h3>
                <div className="matches-content">
                    {latestMatches.map((match, index) => (
                        <div key={index} className="match-card">
                            <h4>Map: {match.map}</h4>
                            <p>Result: {match.result}</p>
                            <p>Score: {match.score}</p>
                            <p>Mode: {match.mode}</p>
                            <p>Date: {match.date}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
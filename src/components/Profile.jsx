import React from 'react';
import './../Css/Profile.css';
import userData from './../Data/users.json';
import matchData from './../Data/matches.json';

const Profile = ({ currentUser }) => {
    if (!currentUser) {
        return <div>Loading ....</div>;
    }

    const currentUserData = userData.users.find(user => user.username == currentUser.username);
    console.log(currentUser);

    if (!currentUserData) {
        return <div className="NoDataFound">No data available for this user.</div>;
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

    return (
        <div className="HomePage">
            <div className="banner" style={{ backgroundImage: `url(${currentUser.bannerPic})` }}>
                <img src={currentUser.profilePic} alt="Profile" className="profile-picture" />
                <p className="member-since">Member since {currentUser.signupTime}</p>
            </div>
            <div className="user-info">
                <h1>{currentUser.username}</h1>
                <p className="bio">{currentUser.bio}</p>
                <p className="additional-info">
                    <span>Name: {currentUserData.name}</span>
                    <span>Rank: {currentUserData.rank}</span>
                    <span>Role: {currentUserData.role}</span>
                    <span>Age: {currentUserData.age}</span>
                </p>
            </div>
            <div className="stats-header">
                <div className="stat-item">Matches Played: {userProfile.stats.matchesPlayed}</div>
                <div className="stat-item">Rating: {userProfile.stats.rating}</div>
                <div className="stat-item">HS%: {userProfile.stats.hsPercentage}</div>
                <div className="stat-item">K/D: {userProfile.stats.kdRatio}</div>
                <div className="stat-item">KAST%: {userProfile.stats.kastPercentage}</div>
                <div className="stat-item">ADR: {userProfile.stats.adr}</div>
            </div>
            <div className="homePageMatches-header">
                <h3>Last 5 Matches</h3>
            </div>
            <div className="homePageMatches">
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
            <div className="team-info">
                <p>Looking for a team? <span>Yes</span> <span>No</span></p>
            </div>
            <div className="socials">
                <p>Socials</p>
                <a href={currentUser.socialMedia.faceit} target="_blank" rel="noopener noreferrer">
                    <img src="/path/to/faceit-icon.png" alt="Faceit" />
                </a>
                <a href={currentUser.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                    <img src="/path/to/twitter-icon.png" alt="Twitter" />
                </a>
                <a href={currentUser.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                    <img src="/path/to/instagram-icon.png" alt="Instagram" />
                </a>
            </div>
        </div>
    );
}

export default Profile;
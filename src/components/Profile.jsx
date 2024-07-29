import React from 'react';
import './../Css/Profile.css';
import userData from './../Data/users.json';


const Profile = ({ currentUser }) => {
    if (!currentUser) {
        return <div>Loading ....</div>;
    }

    const currentUserData = userData.users.find(user => user.username == currentUser.username);
    console.log(currentUserData);

    if (!currentUserData) {
        return <div className="NoDataFound">No data available for this user.</div>;
    }

    const { profilePic, bannerPic, username } = currentUserData;

    const userProfile = {
        memberSince: "January 2023",
        bio: "This is the bio",
        stats: {
            matchesPlayed: 100,
            rating: 4.5,
            hsPercentage: "60%",
            kdRatio: 1.2,
            kastPercentage: "70%",
            adr: 85
        }
    };

    return (
        <div className="HomePage">
            <div className="banner" style={{ backgroundImage: `url(${bannerPic})` }}>
                <img src={profilePic} alt="Profile" className="profile-picture" />
            </div>
            <div className="user-info">
                <h1>{username}</h1>
                <p className="member-since">Member since {userProfile.memberSince}</p>
                <p className="bio">{currentUser.bio}</p>
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
                {/* Render match cards here */}
            </div>
            <div className="team-info">
                <p>Looking for a team? <span>Yes</span> <span>No</span></p>
            </div>
            <div className="socials">
                <p>Socials</p>
                {/* Add social media icons here */}
            </div>
        </div>
    );
}

export default Profile;
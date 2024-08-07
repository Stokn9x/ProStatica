import React, { useState, useEffect } from 'react';
import './../Css/Profile.css';
import matchData from './../Data/matches.json';
import FirstLoginModal from './Modal/FirstLoginModal';

const Profile = ({ currentUser, updateUser }) => {
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		if (currentUser && currentUser.firstLogin) {
			setShowModal(true);
		}
	}, [currentUser]);

	const handleCloseModal = async () => {
		setShowModal(false);
		if (currentUser.firstLogin) {
			try {
				const response = await fetch('http://localhost:5001/updateFirstLogin', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ username: currentUser.username }),
				});

				if (response.ok) {
					console.log('First login status updated successfully!');
					// Opdater lokalt kun hvis serveropdateringen er vellykket
					updateUser({ ...currentUser, firstLogin: false });
				} else {
					console.error('Failed to update first login status:', response.statusText);
				}
			} catch (error) {
				console.error('Failed to update first login status:', error);
			}
		}
	};

	if (!currentUser) {
		return <div>Loading ....</div>;
	}

	console.log(currentUser);

	/*Needs to be fetched from the json files instead, it's way to messy*/
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
		<div className="ProfilePage">
			{showModal && <FirstLoginModal onClose={handleCloseModal} />}
			<div className="banner" style={{ backgroundImage: `url(${currentUser.bannerPic})` }}>
				<img src={currentUser.profilePic} alt="Profile" className="profile-picture" />
				<p className="member-since">Member since {currentUser.signupTime}</p>
			</div>
			<div className="socials-container">
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
			<div className="user-info">
				<h1>{currentUser.username}</h1>
				<p className="bio">{currentUser.bio}</p>
				<p className="additional-info">
					<span>Name: {currentUser.name}</span>
					<span>Rank: {currentUser.rank}</span>
					<span>Role: {currentUser.role}</span>
					<span>Age: {currentUser.age}</span>
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
		</div>
	);
}

export default Profile;
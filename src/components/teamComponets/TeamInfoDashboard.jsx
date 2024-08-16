import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './../../Css/TeamCss/TeamInfoDashboard.css';
import PlayerCard from './../../Cards/PlayerCard';

const TeamInfoDashboard = ({ currentUser, updateUser }) => {
    const [teamInfo, setTeamInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeamInfo = async () => {
            try {
                const response = await fetch(`http://localhost:5001/getTeamInfo?team=${currentUser.currentTeam}`);
                if (response.ok) {
                    const teamData = await response.json();
                    setTeamInfo(teamData);
                } else {
                    console.error('Failed to fetch team info.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (currentUser.currentTeam !== 'none' && currentUser.currentTeam !== '') {
            fetchTeamInfo();
        }
    }, [currentUser.currentTeam]);

    const handleLeaveTeam = async () => {
        try {
            const response = await fetch('http://localhost:5001/leaveTeam', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: currentUser.username }),
            });

            if (response.ok) {
                const responseData = await response.json();
                alert('Successfully left the team.');
                updateUser({
                    ...currentUser,
                    currentTeam: 'none',
                    previousTeams: [...currentUser.previousTeams, responseData.teamName],
                });
                navigate('/TeamCreateJoin');
            } else {
                alert('Failed to leave the team.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const placeholderPlayer = {
        profilePic: '/src/assets/Logo/Placeholder.jpg',
        username: 'Open Slot',
        kd: 'N/A',
        kast: 'N/A',
        rating: 'N/A',
    };

    if (!teamInfo) {
        return <div>Loading...</div>;
    }

    const allPlayers = [...teamInfo.members, ...Array(5 - teamInfo.members.length).fill(placeholderPlayer)];

    return (
        <div className="teamDashboard">
            <img src="/path/to/teamLogo.png" alt="Team Logo" className="teamLogo" />
            <h1>Welcome to Team {teamInfo.teamName}</h1>
            <p>Team Tag: {teamInfo.teamTag}</p>
            <p>Team Creation Date: {teamInfo.teamCreationTime}</p>

            <div className="teamStats">
                <h2>Team Statistics</h2>
                <div className="statItem">Winrate: <span className="statValue">60%</span></div>
                <div className="statItem">Average K/D: <span className="statValue">1.15</span></div>
                <div className="statItem">Total Matches: <span className="statValue">120</span></div>
            </div>

            <button className="leaveTeamButton" onClick={handleLeaveTeam}>Leave Team</button>

            <div className="playerCards">
                {allPlayers.map((player, index) => (
                    <PlayerCard key={index} player={player} />
                ))}
            </div>
        </div>
    );
};

export default TeamInfoDashboard;

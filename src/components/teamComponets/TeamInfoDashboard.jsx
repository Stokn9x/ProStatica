import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './../../Css/TeamCss/TeamInfoDashboard.css';
import PlayerCard from './../../Cards/PlayerCard';

const TeamInfoDashboard = ({ currentUser, updateUser }) => {
    const [teamPlayers, setTeamPlayers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeamPlayers = async () => {
            try {
                const response = await fetch(`http://localhost:5001/teamPlayers?team=${currentUser.currentTeam}`);
                if (response.ok) {
                    const players = await response.json();
                    setTeamPlayers(players);
                } else {
                    console.error('Failed to fetch team players.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (currentUser.currentTeam !== 'none' && currentUser.currentTeam !== '') {
            fetchTeamPlayers();
        }
    }, [currentUser.currentTeam]);

    const handleLeaveTeam = async () => {
        try {
            const response = await fetch('http://localhost:5001/leaveTeam', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: currentUser.username })
            });

            if (response.ok) {
                const responseData = await response.json();
                alert('Successfully left the team.');
                updateUser({ ...currentUser, currentTeam: 'none', previousTeams: [...currentUser.previousTeams, responseData.teamName] });
                navigate('/TeamCreateJoin');
            } else {
                alert('Failed to leave the team.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="teamDashboard">
            <h1>Welcome to Team {currentUser.currentTeam}</h1>
            <p>Team details will be displayed here.</p>
            <button onClick={handleLeaveTeam}>Leave Team</button>
            <div className="playerCards">
                {teamPlayers.map((player, index) => (
                    <PlayerCard key={index} player={player} />
                ))}
            </div>
        </div>
    );
};

export default TeamInfoDashboard;
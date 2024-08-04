import React from 'react';
import { useNavigate } from 'react-router-dom';
import './../../Css/TeamCss/TeamInfo.css';

const TeamInfoDashboard = ({ currentUser, updateUser }) => {
    const navigate = useNavigate();

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
        </div>
    );
};

export default TeamInfoDashboard;
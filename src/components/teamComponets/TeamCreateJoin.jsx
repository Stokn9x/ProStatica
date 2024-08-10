import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../../Css/TeamCss/TeamInfo.css';

const TeamCreateJoin = ({ currentUser, updateUser }) => {
    const [teamName, setTeamName] = useState('');
    const [teamTag, setTeamTag] = useState('');
    const [joinTeamCode, setJoinTeamCode] = useState('');
    const navigate = useNavigate();

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    const handleTeamNameChange = (event) => {
        setTeamName(event.target.value);
    };

    const handleTeamTagChange = (event) => {
        setTeamTag(event.target.value);
    };

    const handleJoinTeamCodeChange = (event) => {
        setJoinTeamCode(event.target.value);
    };

    const handleCreateTeam = async (event) => {
        event.preventDefault();

        const newTeam = {
            teamName,
            teamTag,
            teamCreationTime: `${day}-${month}-${year}`,
            teamCode: Math.random().toString(36).substr(2, 8),
            members: [
                {
                    username: currentUser.username,
                    profilePic: currentUser.profilePic,
                    name: currentUser.name,
                    age: currentUser.age,
                    role: 'admin'
                }
            ]
        };

        try {
            const response = await fetch('http://localhost:5001/createTeam', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTeam)
            });

            if (response.ok) {
                alert('Team creation was successful!');
                updateUser({ ...currentUser, currentTeam: teamName });
                navigate('/TeamInfoDashboard');
            } else {
                alert('Team creation failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleJoinTeam = async (event) => {
        event.preventDefault();

        const user = {
            username: currentUser.username,
            name: currentUser.name,
            age: currentUser.age,
            role: 'rifler'
        };

        try {
            const response = await fetch('http://localhost:5001/joinTeam', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ teamCode: joinTeamCode, user })
            });

            if (response.ok) {
                const responseData = await response.json();
                alert('Team joining was successful!');
                updateUser({ ...currentUser, currentTeam: responseData.team.teamName });
                navigate('/TeamInfoDashboard');
            } else {
                alert('Team joining failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="teamInfo">
            <div className="teamContainer">
                <div className="createTeam">
                    <form onSubmit={handleCreateTeam}>
                        <h1>Create Team</h1>
                        <div className="formGroup">
                            <label htmlFor="teamName">Team Name:</label>
                            <input
                                type="text"
                                id="teamName"
                                value={teamName}
                                onChange={handleTeamNameChange}
                                required
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="teamTag">Team Tag:</label>
                            <input
                                type="text"
                                id="teamTag"
                                value={teamTag}
                                onChange={handleTeamTagChange}
                                required
                            />
                        </div>
                        <button type="submit">Create</button>
                    </form>
                </div>
                <div className="joinTeam">
                    <h1>Join Team</h1>
                    <form onSubmit={handleJoinTeam}>
                        <div className="formGroup">
                            <label htmlFor="joinTeamCode">Team Code:</label>
                            <input
                                type="text"
                                id="joinTeamCode"
                                value={joinTeamCode}
                                onChange={handleJoinTeamCodeChange}
                                required
                            />
                        </div>
                        <button type="submit">Join</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TeamCreateJoin;

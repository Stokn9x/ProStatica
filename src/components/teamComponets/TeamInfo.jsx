import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './../../Css/TeamCss/TeamInfo.css';
import authService from '../../Services/authServices';

const TeamInfo = ({ currentUser, updateUser }) => {
    const [teamName, setTeamName] = useState('');
    const [teamTag, setTeamTag] = useState('');
    const [joinTeamCode, setJoinTeamCode] = useState('');
    const [forceUpdate, setForceUpdate] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!storedUser || !storedUser.currentTeam || storedUser.currentTeam === 'none') {
            navigate('/TeamInfo');
        }
    }, [navigate, forceUpdate]);

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
            teamCode: Math.random().toString(36).substr(2, 8),
            members: [
                {
                    username: currentUser.username,
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
                alert('Team joining was successful!');
                updateUser({ ...currentUser, currentTeam: responseData.teamName });
            } else {
                alert('Team joining failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleLeaveTeam = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5001/leaveTeam', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: currentUser.username })
            });

            if (response.ok) {
                const responseData = await response.json(); // Get team name from response
                alert('You have successfully left the team.');
                const updatedUser = {
                    ...currentUser,
                    currentTeam: 'none',
                    previousTeams: [...currentUser.previousTeams, responseData.teamName]
                };
                authService.updateCurrentUser();
                navigate('/TeamInfo');
            } else {
                alert('Leaving the team failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    console.log(currentUser);

    /*This page might be cut into 2 instead of one, casue it might be a bit too long and fucked to look at*/
    return (
        <div className="teamInfo">
            <div className="teamContainer">
                {(currentUser.currentTeam === 'none' || currentUser.currentTeam === '') ? (
                    <>
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
                    </>
                ) : (
                    <div className="teamDashboard">
                        <h1>Welcome to Team {currentUser.currentTeam}</h1>
                        <p>Team details will be displayed here.</p>
                        <button onClick={handleLeaveTeam}>Leave Team</button>
                    </div>
                )}
            </div>
            <hr className="teamSeparator" />
        </div>
    );
};

export default TeamInfo;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeamCreateJoin from './TeamCreateJoin';
import TeamInfoDashboard from './TeamInfoDashboard';
import './../../Css/TeamCss/TeamInfo.css';

const TeamInfo = ({ currentUser, updateUser }) => {
    const navigate = useNavigate();
    const [forceUpdate, setForceUpdate] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!storedUser || !storedUser.currentTeam || storedUser.currentTeam === 'none') {
            navigate('/TeamCreateJoin');
        }
    }, [navigate, forceUpdate]);

    return (
        <div>
            <div className="teamContainer">
                {(currentUser.currentTeam === 'none' || currentUser.currentTeam === '') ? (
                    <TeamCreateJoin currentUser={currentUser} updateUser={updateUser} />
                ) : (
                    <TeamInfoDashboard currentUser={currentUser} updateUser={updateUser} />
                )}
            </div>
            <hr className="teamSeparator" />
        </div>
    );
};

export default TeamInfo;
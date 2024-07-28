import React, { useState } from 'react';
import './../Css/ProfileMenu.css';
import { useNavigate } from 'react-router-dom';
import userData from './../Data/users.json';

const ProfileMenu = ({ currentUser, handleLogout }) => {
    if (!currentUser) {
        return <div>Loading ....</div>;
    }
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const currentUserData = userData.users.find(user => user.username == currentUser.username);
    console.log(currentUserData);

    if (!currentUserData) {
        return <div className="NoDataFound">No data available for this user.</div>;
    }

    const { profilePic, username } = currentUserData;

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const goToSettings = () => {
        navigate("/settings");
    };

    return (
        <div className="profile-menu">
            <div className="profile-summary" onClick={toggleDropdown}>
                <img src={profilePic} alt="Profile" className="profile-pic" />
                <span className="username">{username}</span>
            </div>
            {dropdownOpen && (
                <div className="dropdown">
                    <button onClick={goToSettings}>Settings</button>
                    <button onClick={handleLogout}>Log Out</button>
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;
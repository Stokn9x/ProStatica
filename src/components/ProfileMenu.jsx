import React, { useState } from 'react';
import './../Css/ProfileMenu.css';
import { useNavigate } from 'react-router-dom';

const ProfileMenu = ({ currentUser, handleLogout }) => {
    if (!currentUser) {
        return <div>Loading ....</div>;
    }
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const goToSettings = () => {
        navigate("/settings");
    };

    const goToInbox = () => {
        navigate("/inbox");
    }

    const goToProfile = () => {
        navigate(/profile/${ currentUser.username });
    }

    return (
        <div className="profile-menu">
            <div className="profile-summary" onClick={toggleDropdown}>
                <img src={currentUser.profilePic} alt="Profile" className="profile-pic" />
                <span className="username">{currentUser.username}</span>
            </div>
            {dropdownOpen && (
                <div className="dropdown">
                    <button onClick={goToProfile}>Your Profile</button>
                    <button onClick={goToInbox}>Inbox</button>
                    <button onClick={goToSettings}>Settings</button>
                    <button onClick={handleLogout}>Log Out</button>
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;
import React from 'react';
import '/src/Css/Header.css';
import SearchField from './SearchFIeld.jsx';
import ProfileMenu from './ProfileMenu.jsx';
import friendIcon from '/src/assets/Icon/friend-icon.svg';
import bellIcon from '/src/assets/Icon/bell-icon.svg';
import { useNavigate } from 'react-router-dom';

function Header({ currentUser, handleLogout }) {
    return (
        <div className="header">
            <div className="header-content">
                <SearchField />               
                    <ProfileMenu currentUser={currentUser} handleLogout={handleLogout} />
                </div>
            </div>
    );
}

export default Header;

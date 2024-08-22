import React from 'react';
import '/src/Css/Header.css';
import SearchField from './SearchFIeld.jsx';
import ProfileMenu from './ProfileMenu.jsx';

function Header({ currentUser, handleLogout }) {
    return (
        <div className="header">
            <SearchField />
            <div className="icons">
                <a href="#">
                    <img src="C:/Users/cappe/Source/Repos/Esport_UI/src/assets/Icon/friend-icon.svg" alt="Friend Icon" />
                </a>
                <a href="#">
                    <i className="fab fa-linkedin"></i>
                </a>
            </div>
            <ProfileMenu currentUser={currentUser} handleLogout={handleLogout} />
        </div>
    );
}

export default Header;

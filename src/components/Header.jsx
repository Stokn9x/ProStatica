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
                <div className="right-section">
                    <div className="icons">
                        <a href="#">
                            <img src={friendIcon} alt="Friend Icon" />
                        </a>
                        <a href="#">
                            <img src={bellIcon} alt="Bell Icon" />
                        </a>
                    </div>
                    <ProfileMenu currentUser={currentUser} handleLogout={handleLogout} />
                </div>
            </div>
        </div>
    );
}

export default Header;
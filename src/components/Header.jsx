import React, { useState } from 'react';
import '/src/Css/Header.css';
import SearchField from './SearchFIeld.jsx';
import ProfileMenu from './ProfileMenu.jsx';
import friendIcon from '/src/assets/Icon/friend-icon.svg';
import bellIcon from '/src/assets/Icon/bell-icon.svg';
import FriendsMenu from './FriendsMenu.jsx';
import NotifikationMenu from './NotifikationMenu.jsx';
import { useNavigate } from 'react-router-dom';

function Header({ currentUser, handleLogout }) {
    const [isFriendsMenuOpen, setIsFriendsMenuOpen] = useState(false);
    const [isNotifikationMenuOpen, setIsNotifikationMenuOpen] = useState(false);

    const toggleFriendsMenu = () => {
        setIsFriendsMenuOpen(!isFriendsMenuOpen);
    };

    const toggleNotifikationMenu = () => {
        setIsNotifikationMenuOpen(!isNotifikationMenuOpen);
	}

    return (
        <div className="header">
            <div className="header-content">
                <SearchField />
                <div className="right-section">
                    <div className="icons">
                        <button onClick={toggleFriendsMenu}>
                            <img src={friendIcon} alt="Friend Icon" />
                        </button>
                        <button onClick={toggleNotifikationMenu}>
                            <img src={bellIcon} alt="Bell Icon" />
                        </button>
                    </div>
                    <NotifikationMenu currentUser={currentUser} isOpen={isFriendsMenuOpen} />
                    <FriendsMenu currentUser={currentUser} isOpen={isFriendsMenuOpen} />
                    <ProfileMenu currentUser={currentUser} handleLogout={handleLogout} />
                </div>
            </div>
        </div>
    );
}

export default Header;

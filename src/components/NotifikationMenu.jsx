import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/Css/FriendsMenu.css';

function NotifikationMenu({ currentUser, isOpen }) {

    if (!isOpen || !currentUser) {
        return null;
    }

    return (
        <div className="NotifikationMenu">
        <h1 className="menu-header">Notifikation</h1>
        </div>
    );
}

export default NotifikationMenu;

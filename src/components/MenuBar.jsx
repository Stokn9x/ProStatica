import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './../Css/MenuBar.css';
<link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />


function MenuBar({ currentUser }) {
    const [isPersonalInfoOpen, setPersonalInfoOpen] = useState(false);
    const [isTeamInfoOpen, setTeamInfoOpen] = useState(false);
    const location = useLocation();

    // Reset menu state on route change
    useEffect(() => {
        setPersonalInfoOpen(false);
        setTeamInfoOpen(false);
    }, [location.pathname]);

    const isUserInTeam = currentUser && currentUser.currentTeam !== 'none' && currentUser.currentTeam !== '';
    const profileLink = currentUser ? `/profile/${currentUser.username}` : '/login';

    return (
        <div ClassName="sidebar">
            <div className="top">
                <div className="logo">
                    <i className="bx bxl-codepen"></i>
                    <span>WebsiteName</span>
                </div>'
                <i className="bx bx-menu" id="btn"></i>
            </div>
            <div className="user"></div>
        </div>



    );
}
export default MenuBar;



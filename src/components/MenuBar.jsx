import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './../Css/MenuBar.css'; // Tilføj en CSS-fil for yderligere styling

function MenuBar() {

    const [isPersonalInfoOpen, setPersonalInfoOpen] = useState(false);
    const [isTeamInfoOpen, setTeamInfoOpen] = useState(false);

    return (
        <div className="vertical-menu">
            <div className="menu-header">
                <img src="path-to-your-logo.png" alt="Logo" className="logo" />
                <h3>SideBar Frame</h3>
            </div>
            <Link to="/" className="btn menu-btn active">Home</Link>

            <div className="menu-section-title" onClick={() => setPersonalInfoOpen(!isPersonalInfoOpen)}>Personal info</div>
            {isPersonalInfoOpen && (
                <>
                    <Link to="/matches" className="menu-btn">Matches</Link>
                    <button type="button" className="menu-btn">General</button>
                    <button type="button" className="menu-btn">Maps</button>
                </>
            )}

            <div className="menu-section-title" onClick={() => setTeamInfoOpen(!isTeamInfoOpen)}>Team Info</div>
            {isTeamInfoOpen && (
                <>
                    <button type="button" className="menu-btn">Team person info</button>
                    <button type="button" className="menu-btn">Team stats</button>
                    <button type="button" className="menu-btn">Calendar</button>
                </>
            )}

            <div className="menu-footer">
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-linkedin"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
                <a href="#"><i className="fab fa-discord"></i></a>
                <a href="#"><i className="fas fa-envelope"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
            </div>
        </div>
    );
}

export default MenuBar;
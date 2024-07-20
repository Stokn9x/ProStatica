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
            <Link to="/home" className="btn menu-btn active">Home</Link>

            <div className="menu-section-title" onClick={() => setPersonalInfoOpen(!isPersonalInfoOpen)}>Personal info</div>
            {isPersonalInfoOpen && (
                <>
                    <Link to="/matches" className="menu-btn">Played Matches</Link>
                    <Link to="/playerStats" className="menu-btn">General Stats</Link>
                    <Link to="/playerMapStats" className="menu-btn">Maps stats</Link>
                </>
            )}

            <div className="menu-section-title" onClick={() => setTeamInfoOpen(!isTeamInfoOpen)}>Team(Needs reworkd)</div>
            {isTeamInfoOpen && (
                <>
                    <Link to="/TeamInfo" className="menu-btn">Team Info</Link>
                    <Link to="/TeamStats" className="menu-btn">Team Stats</Link>
                    <Link to="/TeamMapStats" className="menu-btn">Team Map Stats</Link>
                    <Link to="/TeamMatches" className="menu-btn">Team Matches</Link>
                    <Link to="/TeamCalendar" className="menu-btn">Team Calendar</Link>
                </>
            )}

            <div className="menu-footer">
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="https://www.linkedin.com/in/casper-jensen-783650145/"><i className="fab fa-linkedin"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
                <a href="#"><i className="fab fa-discord"></i></a>
                <a href="#"><i className="fas fa-envelope"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
            </div>
        </div>
    );
}

export default MenuBar;
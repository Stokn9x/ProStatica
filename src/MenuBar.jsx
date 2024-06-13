import React from 'react';
import './MenuBar.css'; // Tilføj en CSS-fil for yderligere styling

function MenuBar() {
    return (
        <div className="vertical-menu">
            <div className="menu-header">
                <img src="path-to-your-logo.png" alt="Logo" className="logo" />
                <h3>SideBar Frame</h3>
            </div>
            <button type="button" className="btn menu-btn active">Home</button>
            <button type="button" className="btn menu-btn">Matches</button>
            <button type="button" className="btn menu-btn">General</button>
            <button type="button" className="btn menu-btn">Maps</button>
            <div className="menu-section-title">Team Info</div>
            <button type="button" className="btn menu-btn">Team person info</button>
            <button type="button" className="btn menu-btn">Team stats</button>
            <button type="button" className="btn menu-btn">Calendar</button>
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
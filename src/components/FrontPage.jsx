import React from 'react';
import { Link } from 'react-router-dom';
import '/src/Css/FrontPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Homepage = () => {
    return (
        <div>
            <nav className="navbar">
                <div className="navdiv">
                    <div className="logo"><a href="#">WebsiteName</a></div>
                    <ul className="navbar-list">
                        <li><Link to="/profile">Home</Link></li>
                        <li><Link to="/About">About</Link></li>
                        <li><Link to="#">Contact</Link></li>
                        <li><button><Link to="/Login">Login</Link></button></li>
                        <li><button><Link to="/Signup">Sign Up</Link></button></li>
                    </ul>
                </div>
            </nav>
            <div className="content-wrapper">
                <div className="content-desc">
                    <h1>Game Smarter, Not Harder: Your Stats, Your Strategy, Your Victory.</h1>
                    <p>Click the button to get started.</p>
                </div>
            </div>
        </div>
    );
};

export default Homepage;

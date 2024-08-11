import React from 'react';
import { Link } from 'react-router-dom';
import '/src/Css/FrontPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Homepage = () => {
    return (
        <div>
            <div className="navbar">
                <nav>
                    <ul className="navbar-list">
                        <img src="your_logo_image_here" alt="Your Logo" />
                        <li><Link to="/About">About</Link></li>
                        <li><Link to="#">Random</Link></li>
                        <li><Link to="/Login">Login</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Homepage;

import React from 'react';
import { Link } from 'react-router-dom';
import '/src/Css/HomePage.css';

const Homepage = () => {
    return (
        <div className="homepage">
            <div className="topbar">
                <Link to="/about" className="topbar-link">About</Link>
                <Link to="/login" className="topbar-link">Login</Link>
                <Link to="/contact" className="topbar-link">Contact</Link>
            </div>
            <div className="content">
                <h1>Welcome to Our Site</h1>
                <p>Your journey begins here. Explore, learn, and enjoy!</p>
            </div>
        </div>
    );
};

export default Homepage;
import React from 'react';
import { Link } from 'react-router-dom';
import '/src/Css/LoginPage.css';

const LoginPage = () => {
    return (
        <div className="homepage">
            <div className="topbar">
                <Link to="/HomePage" className="topbar-link">About</Link>
            </div>
        </div>
    );
};

export default LoginPage
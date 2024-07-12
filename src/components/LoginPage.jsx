import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '/src/Css/LoginPage.css';

const LoginPage = () => {
    return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo">
                    <h1>Logo og navn</h1>
                </div>
                <div className="welcome-message">
                    <h2>Welcome to the heart of Counter-Strike statistics</h2>
                    <hr className="line"></hr>
                </div>
                <form>
                    <input type="email" placeholder="Email" className="login-input" />
                    <input type="password" placeholder="Password" className="login-input" />
                    <button type="submit" className="login-button">Log in</button>
                </form>
                <div className="forgot-password">
                    <Link to="/forgot-password">Forgot your password?</Link>
                </div>
                <div className="signup">
                    Don’t have an account? <Link to="/signup">Sign up for free</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage
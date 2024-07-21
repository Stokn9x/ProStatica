import React, { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '/src/Css/LoginPage.css';

function Login({ handleLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (handleLogin(email, password)) {
            navigate('/home');
        }
        else {
            alert("Invalid creds")
        }
    };

   return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo">
                    <h1>Logo og navn</h1>
                </div>
                <div className="welcome-message">
                    <h2>Welcome to the heart of Counter-Strike statistics</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="login-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="login-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="login-button">Log in</button>
                </form>
                <div className="forgot-password">
                    <Link to="/forgot-password">Forgot your password?</Link>
                </div>
                <div className="signup">
                   Don�t have an account? <Link to="/sign-Up">Sign up for free</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
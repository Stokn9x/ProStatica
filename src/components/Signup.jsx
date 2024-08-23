import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './../Css/SignUp.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();

        if (password !== retypePassword) {
            setError('Passwords do not match');
            return;
        }

        const newUser = {
            username,
            email,
            password
        };
        console.log(newUser);

        fetch('http://localhost:5001/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Signup failed');
                }
                return response.json();
            })
            .then(data => {
                navigate('/login');
            })
            .catch(error => {
                setError('Signup failed. Please try again.');
                console.error('Error:', error);
            });
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo">
                    <h1>MyApp</h1>
                </div>
                <div className="welcome-message">
                    <h2>Join the heart of Counter-Strike statistics</h2>
                </div>
                <form onSubmit={handleSignup}>
                    <input
                        type="text"
                        placeholder="Username"
                        className="login-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="login-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="login-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Retype Password"
                        className="login-input"
                        value={retypePassword}
                        onChange={(e) => setRetypePassword(e.target.value)}
                        required
                    />
                    {error && <p className="error">{error}</p>}
                    <button type="submit" className="login-button">Sign up</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;

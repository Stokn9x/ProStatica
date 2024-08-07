import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../Css/SignUp.css';

function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const navigate = useNavigate();

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== retypePassword) {
            alert('Passwords do not match');
            return;
        }

        const newUser = {
            username,
            email,
            password,
            rank: "Unranked",
            name: "none",
            age: "none",
            role: "none",
            profilePic: "/src/assets/Logo/Placeholder.jpg",
            bannerPic: "/src/assets/Banner/placeholder-banner.jpg",
            bio: "none",
            location: "none",
            firstLogin: true,
            socialMedia: {
                "faceit": "none",
                "twitter": "none",
                "instagram": "none"
            },
            signupTime: `${day}-${month}-${year}`,
            "currentTeam": "none",
            "previousTeams": [
                "none"
            ]
        };

        try {
            const response = await fetch('http://localhost:5001/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                alert('Signup successful!');
                navigate('/login');
            } else {
                alert('Signup failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during signup');
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
                        type="text"
                        placeholder="Username"
                        className="login-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
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
                    <input
                        type="password"
                        placeholder="Retype Password"
                        className="login-input"
                        value={retypePassword}
                        onChange={(e) => setRetypePassword(e.target.value)}
                    />
                    <button type="submit" className="login-button">Sign up</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;

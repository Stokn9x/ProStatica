import React from 'react';
import './../Css/SignUp.css';


function SignUp() {

    const handleSubmit = (e) => {
        e.preventDefault();
        if (handleLogin(email, password)) {
            navigate('/login');
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
                        type="name"
                        placeholder="Full Name"
                        className="login-input"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="login-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="login-input"
                    />
                    <input
                        type="password"
                        placeholder="Retype Password"
                        className="login-input"
                    />
                    <button type="submit" className="login-button">Sign up</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
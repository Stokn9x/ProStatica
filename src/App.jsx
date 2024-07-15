//import Header from "./Header.jsx"
//import Footer from "./Footer.jsx"

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MenuBar from './components/MenuBar';
import Matches from './components/Matches';
import MatchDetail from './components/MatchDetail';
import LoggedInHome from './components/LoggedInHome';
import PlayerStats from './components/PlayerStats';
import Homepage from './components/HomePage';
import Login from './/components/Login';
import authService from './Services/authServices';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Css/App.css';



function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(authService.getAuthStatus());
    const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());

    useEffect(() => {
        setIsAuthenticated(authService.getAuthStatus());
        setCurrentUser(authService.getCurrentUser());
    }, []);

    const handleLogin = (email, password) => {
        if (authService.login(email, password)) {
            setIsAuthenticated(true);
            setCurrentUser(authService.getCurrentUser())
        }
        else {
            alert("Invalid creds ");
        }
    };

    const handleLogout = () => {
        authService.logout();
        setIsAuthenticated(false);
        setCurrentUser(null);
    };

    return (
            <div className="App">
                {window.location.pathname !== '/' && <MenuBar />}
                <div className="content">
                    <Routes>
                        <Route path="login" element={<Login handleLogin={handleLogin} />} />
                        <Route path="/" element={<Homepage />} />
                        <Route path="/home" element={isAuthenticated ? <LoggedInHome currentUser={currentUser} /> : <Navigate to="/login" />} />
                        <Route path="/matches" element={isAuthenticated ? <Matches currentUser={currentUser} /> : <Navigate to="/login" />} />
                        <Route path="/match/:id" element={isAuthenticated ? <MatchDetail currentUser={currentUser} /> : <Navigate to="/login" />} />
                        <Route path="/playerStats" element={isAuthenticated ? <PlayerStats currentUser={currentUser} /> : <Navigate to="/login" />} />
                    </Routes>
                </div>
            </div>
    );
}

export default App;
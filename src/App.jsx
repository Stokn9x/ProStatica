//import Header from "./Header.jsx"
//import Footer from "./Footer.jsx"

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuBar from './components/MenuBar';
import Matches from './components/Matches';
import MatchDetail from './components/MatchDetail';
import LoggedInHome from './components/LoggedInHome';
import PlayerStats from './components/PlayerStats';
import Homepage from './components/HomePage';
import LoginPage from './components/LoginPage';
import authService from './Services/authServices';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Css/App.css';



function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(authService.getAuthStatus());

    useEffect(() => {
        setIsAuthenticated(authService.getAuthStatus());
    }, []);




    return (

        <div className="App">
            {window.location.pathname !== '/' && <MenuBar />}
            <div className="content">
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="Login" element={<LoginPage /> } />
                    <Route path="/home" element={<LoggedInHome />} />
                    <Route path="/matches" element={<Matches />} />
                    <Route path="/match/:id" element={<MatchDetail />} />
                    <Route path="/playerStats" element={<PlayerStats />} />
                </Routes>
            </div>
        </div>

    );
}

export default App;
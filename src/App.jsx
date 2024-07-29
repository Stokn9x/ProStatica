//import Header from "./Header.jsx"
//import Footer from "./Footer.jsx"

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import authService from './Services/authServices';
import ProfileMenu from './components/ProfileMenu';
import MenuBar from './components/MenuBar';
import Matches from './components/Matches';
import MatchDetail from './components/MatchDetail';
import Profile from './components/Profile';
import PlayerStats from './components/PlayerStats';
import Homepage from './components/HomePage';
import Login from './/components/Login';
import PlayerMapStats from './components/PlayerMapStats';
import SignUp from './components/Signup';
import SettingsPage from './components/SettingsPage';

import TeamInfo from './components/teamComponets/TeamInfo';
import TeamCalendar from './components/teamComponets/TeamCalendar';
import TeamMapStats from './components/teamComponets/TeamMapStats';
import TeamMatches from './components/teamComponets/TeamMatches';
import TeamStats from './components/teamComponets/TeamStats';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Css/App.css';



function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(authService.getAuthStatus());
    const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());

    const location = useLocation();

    useEffect(() => {
        setIsAuthenticated(authService.getAuthStatus());
        setCurrentUser(authService.getCurrentUser());
    }, []);

    const handleLogin = (email, password) => {
        console.log("Handling login with", email, password);
        const result = authService.login(email, password);
        console.log("Login result:", result);
        if (result) {
            setIsAuthenticated(true);
            setCurrentUser(authService.getCurrentUser());
        } else {
            alert("Invalid creds");
        }
        return result;
    };

    const handleLogout = () => {
        authService.logout();
        setIsAuthenticated(false);
        setCurrentUser(null);
    };

    const hideMenuBarRoutes = ["/login", "/sign-Up", "/"];

    return (
            <div className="App">
            {!hideMenuBarRoutes.includes(location.pathname) && <MenuBar />}
                {isAuthenticated && <ProfileMenu currentUser={currentUser} handleLogout={handleLogout} />}
                <div className="content">
                    <Routes>
                        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
                        <Route path="/sign-Up" element={<SignUp /> } />
                        <Route path="/" element={<Homepage />} />
                        <Route path="/profile" element={isAuthenticated ? <Profile currentUser={currentUser} /> : <Navigate to="/login" />} />
                        <Route path="/matches" element={isAuthenticated ? <Matches currentUser={currentUser} /> : <Navigate to="/login" />} />
                        <Route path="/match/:id" element={isAuthenticated ? <MatchDetail currentUser={currentUser} /> : <Navigate to="/login" />} />
                        <Route path="/playerStats" element={isAuthenticated ? <PlayerStats currentUser={currentUser} /> : <Navigate to="/login" />} />
                        <Route path="/playerMapStats" element={isAuthenticated ? <PlayerMapStats currentUser={currentUser} /> : <Navigate to="/login" />} />
                        <Route path="/settings" element={isAuthenticated ? <SettingsPage currentUser={currentUser} /> : <Navigate to="/login" />} />

                        {/*All the team pages */}
                        <Route path="/TeamInfo" element={isAuthenticated ? <TeamInfo currentUser={currentUser} /> : <Navigate to="/login" />} />
                        <Route path="/TeamStats" element={isAuthenticated ? <TeamStats currentUser={currentUser} /> : <Navigate to="/login" />} />
                        <Route path="/TeamMapStats" element={isAuthenticated ? <TeamMapStats currentUser={currentUser} /> : <Navigate to="/login" />} />
                        <Route path="/TeamMatches" element={isAuthenticated ? <TeamMatches currentUser={currentUser} /> : <Navigate to="/login" />} />
                        <Route path="/TeamCalendar" element={isAuthenticated ? <TeamCalendar currentUser={currentUser} /> : <Navigate to="/login" />} />
                    </Routes>
                </div>
            </div>
    );
}

export default App;
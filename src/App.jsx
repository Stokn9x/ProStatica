//import Footer from "./Footer.jsx"

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, matchPath } from 'react-router-dom';
import authService from './Services/authServices';
import MenuBar from './components/MenuBar';
import Matches from './components/Matches';
import MatchDetail from './components/MatchDetail';
import Profile from './components/Profile';
import PlayerStats from './components/PlayerStats';
import Homepage from './components/FrontPage';
import Login from './/components/Login';
import PlayerMapStats from './components/PlayerMapStats';
import SignUp from './components/Signup';
import SettingsPage from './components/SettingsPage';
import AboutPage from './components/About';
import TeamInfo from './components/teamComponets/TeamInfo';
import TeamCalendar from './components/teamComponets/TeamCalendar';
import TeamMapStats from './components/teamComponets/TeamMapStats';
import TeamMatches from './components/teamComponets/TeamMatches';
import TeamStats from './components/teamComponets/TeamStats';
import TeamCreateJoin from './components/teamComponets/TeamCreateJoin';
import TeamInfoDashboard from './components/teamComponets/TeamInfoDashboard';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Css/App.css';
import FeedComponent from './components/FeedComponent';
import InboxPage from './components/InboxPage';

const routesToShowContent = [
    "/profile/:username",
    "/matches",
    "/match/:id",
    "/playerStats",
    "/playerMapStats",
    "/settings",
    "/TeamInfoDashboard",
    "/TeamCreateJoin",
    "/TeamInfo",
    "/TeamStats",
    "/TeamMapStats",
    "/TeamMatches",
    "/TeamCalendar",
    "/feed",
    "/inbox"
];

const shouldShowContent = (pathname) => {
    return routesToShowContent.some(route => matchPath(route, pathname));
};

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(authService.getAuthStatus());
    const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
    const location = useLocation();

    useEffect(() => {
        setIsAuthenticated(authService.getAuthStatus());
        setCurrentUser(authService.getCurrentUser());
    }, []);

    const handleLogin = async (email, password) => {
        console.log("Handling login with", email, password);
        const result = await authService.login(email, password);
        console.log("Login result:", result);
        if (result) {
            setIsAuthenticated(true);
            setCurrentUser(authService.getCurrentUser());
        } else {
            alert("Invalid credentials");
        }
        return result;
    };

    const handleLogout = () => {
        authService.logout();
        setIsAuthenticated(false);
        setCurrentUser(null);
    };

    const updateUser = (updatedUser) => {
        authService.updateCurrentUser(updatedUser);
        setCurrentUser(authService.getCurrentUser());
    };

    const isUserInTeam = currentUser && currentUser.currentTeam !== 'none' && currentUser.currentTeam !== '';

    return (
            <div className="App">
                {shouldShowContent(location.pathname) && <MenuBar currentUser={currentUser} />}
                {/*{shouldShowContent(location.pathname) && <ProfileMenu currentUser={currentUser} handleLogout={handleLogout} />}*/}
                {shouldShowContent(location.pathname) && <Header currentUser={currentUser} handleLogout={handleLogout} />}
                <div className="content">
                    <Routes>
                    <Route path="/login" element={<Login handleLogin={handleLogin} />} /> {/*Det her skal laves om login skal ik tage imod en currentUser*/}
                        <Route path="/sign-Up" element={<SignUp /> } />
                        <Route path="/" element={<Homepage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/profile/:username" element={isAuthenticated ? <Profile currentUser={currentUser} updateUser={updateUser} /> : <Navigate to="/login" />} />
                        <Route path="/matches" element={isAuthenticated ? <Matches currentUser={currentUser} /> : <Navigate to="/login" />} />
                        <Route path="/match/:id" element={isAuthenticated ? <MatchDetail currentUser={currentUser} /> : <Navigate to="/login" />} />
                        <Route path="/playerStats" element={isAuthenticated ? <PlayerStats currentUser={currentUser} /> : <Navigate to="/login" />} />
                        <Route path="/playerMapStats" element={isAuthenticated ? <PlayerMapStats currentUser={currentUser} /> : <Navigate to="/login" />} />
                        <Route path="/settings" element={isAuthenticated ? <SettingsPage currentUser={currentUser} /> : <Navigate to="/login" />} />
                        <Route path="/feed" element={isAuthenticated ? <FeedComponent currentUser={currentUser} /> : <Navigate to="/login" />} />"
                        <Route path="/inbox" element={isAuthenticated ? <InboxPage currentUser={currentUser} /> : <Navigate to="/login" />} />
                        {/*All the team pages */}
                        <Route path="/TeamInfoDashboard" element={isAuthenticated ? (isUserInTeam ? <TeamInfoDashboard currentUser={currentUser} updateUser={updateUser} /> : <Navigate to="/TeamCreateJoin" />) : <Navigate to="/login" />} />
                        <Route path="/TeamCreateJoin" element={isAuthenticated ? <TeamCreateJoin currentUser={currentUser} updateUser={updateUser} /> : <Navigate to="/login" />} />
                        <Route path="/TeamInfo" element={isAuthenticated ? <TeamInfo currentUser={currentUser} updateUser={updateUser} /> : <Navigate to="/login" />} />
                        <Route path="/TeamStats" element={isAuthenticated ? (isUserInTeam ? <TeamStats currentUser={currentUser} /> : <Navigate to="/TeamCreateJoin" />) : <Navigate to="/login" />} />
                        <Route path="/TeamMapStats" element={isAuthenticated ? (isUserInTeam ? <TeamMapStats currentUser={currentUser} /> : <Navigate to="/TeamCreateJoin" />) : <Navigate to="/login" />} />
                        <Route path="/TeamMatches" element={isAuthenticated ? (isUserInTeam ? <TeamMatches currentUser={currentUser} /> : <Navigate to="/TeamCreateJoin" />) : <Navigate to="/login" />} />
                        <Route path="/TeamCalendar" element={isAuthenticated ? (isUserInTeam ? <TeamCalendar currentUser={currentUser} /> : <Navigate to="/TeamCreateJoin" />) : <Navigate to="/login" />} />
                    </Routes>
                </div>
            </div>
    );
}

export default App;
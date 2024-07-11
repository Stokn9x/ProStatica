//import Header from "./Header.jsx"
//import Footer from "./Footer.jsx"

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuBar from './components/MenuBar';
import Matches from './components/Matches';
import MatchDetail from './components/MatchDetail';
import LoggedInHome from './components/LoggedInHome';
import PlayerStats from './components/PlayerStats';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Css/App.css';

function App() {
    return (

        <div className="App">
            <MenuBar />
            <div className="content">
                <Routes>
                    <Route path="/" element={<LoggedInHome />} />
                    <Route path="/matches" element={<Matches />} />
                    <Route path="/match/:id" element={<MatchDetail />} />
                    <Route path="/playerStats" element={<PlayerStats />} />
                </Routes>
            </div>
        </div>

    );
}

export default App;
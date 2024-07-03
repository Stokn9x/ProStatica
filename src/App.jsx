import Header from "./Header.jsx"
import Footer from "./Footer.jsx"
import PlayerCard from "./PlayerCard.jsx";

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MenuBar from "./MenuBar.jsx";
import Matches from './Matches';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Css/App.css';

function App() {

    return (
        <div className="App">
            <MenuBar />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/matches" element={<Matches />} /> {/* Tilføj Matches ruten */}
                </Routes>
            </div>
        </div>
    );
}

export default App

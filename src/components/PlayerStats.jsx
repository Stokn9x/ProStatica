import React from 'react';
import './../Css/PlayerStats.css';
import playerStatsData from './../Data/playerStats.json';

const PlayerStats = () => {
    const { playerName, mapStats } = playerStatsData;

    const statDescriptions = {
        winrate: "Procentdel af vundne kampe.",
        kda: "Kill/Death/Assist forhold.",
        trounds: "Antal spillet runder p� T-side.",
        ctrounds: "Antal spillet runder p� CT-side.",
        gamesPlayed: "Antal spillet kampe.",
        kills: "Antal kills.",
        killr: "Kill rate per runde.",
        adr: "Average damage per runde.",
        wins: "Antal vundne kampe.",
        deaths: "Antal d�de.",
        gunround: "Antal vundne gun rounds.",
        headshots: "Antal headshots.",
        losses: "Antal tabte kampe.",
        assist: "Antal assists."
    };

    return (
        <div className="player-stats">
            <div className="player-info">
                <img src={playerStatsData.profilePicture} alt="Profile" className="profile-picture" />
                <h1>{playerName}</h1>
                <p>Pro Gamer</p>
            </div>
            <div className="filters">
                <div className="filter-group">
                    <label>Side (All/T/CT)</label>
                    <select>
                        <option value="all">All</option>
                        <option value="t">T-side</option>
                        <option value="ct">CT-side</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Game stat period</label>
                    <div className="date-inputs">
                        <input type="date" placeholder="From" />
                        <input type="date" placeholder="To" />
                    </div>
                </div>
            </div>
            <div className="stat-group">
                <button className="stat-button">All</button>
                <button className="stat-button">T-side</button>
                <button className="stat-button">CT-side</button>
            </div>
            <div className="stats-overview">
                <div className="stat-sections">
                    <div className="stat-section">
                        <h2>Overall Stats</h2>
                        {Object.keys(mapStats.overall).map((key, index) => (
                            <div className="stat-category" key={index}>
                                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {mapStats.overall[key]}
                                <span className="tooltip">{statDescriptions[key]}</span>
                            </div>
                        ))}
                    </div>
                    <div className="stat-section">
                        <h2>T-Side Stats</h2>
                        {Object.keys(mapStats.tSide).map((key, index) => (
                            <div className="stat-category" key={index}>
                                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {mapStats.tSide[key]}
                                <span className="tooltip">{statDescriptions[key]}</span>
                            </div>
                        ))}
                    </div>
                    <div className="stat-section">
                        <h2>CT-Side Stats</h2>
                        {Object.keys(mapStats.ctSide).map((key, index) => (
                            <div className="stat-category" key={index}>
                                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {mapStats.ctSide[key]}
                                <span className="tooltip">{statDescriptions[key]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlayerStats;

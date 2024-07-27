import React from 'react';
import './../Css/PlayerStats.css';
import playerStatsData from './../Data/playerStats.json';

const PlayerStats = ({ currentUser }) => {
    if (!currentUser) {
        return <div>Loading ....</div>;
    }

    const currentUserData = playerStatsData.players.find(player => player.playerName == currentUser.username);
    console.log(currentUserData);

    if (!currentUserData) {
        return <div className="NoDataFound">No data available for this user.</div>;
    }

    const { playerName, mapStats, profilePicture } = currentUserData;

    const statDescriptions = {
        winrate: "Procentdel af vundne kampe.",
        kda: "Kill/Death/Assist forhold.",
        trounds: "Antal spillet runder på T-side.",
        ctrounds: "Antal spillet runder på CT-side.",
        gamesPlayed: "Antal spillet kampe.",
        kills: "Antal kills.",
        killr: "Kill rate per runde.",
        adr: "Average damage per runde.",
        wins: "Antal vundne kampe.",
        deaths: "Antal døde.",
        gunround: "Antal vundne gun rounds.",
        headshots: "Antal headshots.",
        losses: "Antal tabte kampe.",
        assist: "Antal assists."
    };

    return (
        <div className="player-stats">
            <div className="player-info">
                <img src={profilePicture} alt="Profile" className="profile-picture-playerStats" />
                <h1>{playerName}</h1>
                <p>Pro Gamer</p>
            </div>
            <div className="filters">
                <div className="filter-group">
                    <label>Time filter</label>
                    <select>
                        <option value="all">Current Week</option>
                        <option value="t">Last 2 weeks</option>
                        <option value="ct">Last 30 days</option>
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

import React, { useEffect, useState } from 'react';
import './../Css/PlayerStats.css';

const PlayerStats = ({ currentUser }) => {
    const [playerData, setPlayerData] = useState(null);

    useEffect(() => {
        if (currentUser) {
            fetch(`http://localhost:5001/playerStats/${currentUser.username}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => setPlayerData(data))
                .catch((error) => console.error('Error fetching player data:', error));
        }
    }, [currentUser]);

    const calculateAverage = (array) => {
        if (!array || array.length === 0) return 'N/A';
        const numericArray = array.map((value) =>
            typeof value === 'string' && value.endsWith('%')
                ? parseFloat(value)
                : value
        );
        const sum = numericArray.reduce((a, b) => a + b, 0);
        const average = sum / numericArray.length;
        return typeof array[0] === 'string' && array[0].endsWith('%')
            ? `${average.toFixed(1)}%`
            : average.toFixed(1);
    };

    if (!playerData) {
        return <div>Loading ....</div>;
    }

    const statDescriptions = {
        winrate: 'Procentdel af vundne kampe.',
        kda: 'Kill/Death/Assist forhold.',
        trounds: 'Antal spillet runder på T-side.',
        ctrounds: 'Antal spillet runder på CT-side.',
        gamesPlayed: 'Antal spillet kampe.',
        kills: 'Antal kills.',
        killr: 'Kill rate per runde.',
        adr: 'Average damage per runde.',
        wins: 'Antal vundne kampe.',
        deaths: 'Antal døde.',
        gunround: 'Antal vundne gun rounds.',
        headshots: 'Antal headshots.',
        losses: 'Antal tabte kampe.',
        assist: 'Antal assists.',
    };

    return (
        <div className="player-stats">
            <div className="player-info">
                <img
                    src={currentUser.profilePic}
                    alt="Profile"
                    className="profile-picture-playerStats"
                />
                <h1>{playerData.playerName}</h1>
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
                        {Object.keys(playerData.stats.overall).map((key, index) => (
                            <div className="stat-category" key={index}>
                                <strong>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                                </strong>{' '}
                                {calculateAverage(playerData.stats.overall[key])}
                                <span className="tooltip">{statDescriptions[key]}</span>
                            </div>
                        ))}
                    </div>
                    <div className="stat-section">
                        <h2>T-Side Stats</h2>
                        {Object.keys(playerData.stats.tSide).map((key, index) => (
                            <div className="stat-category" key={index}>
                                <strong>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                                </strong>{' '}
                                {calculateAverage(playerData.stats.tSide[key])}
                                <span className="tooltip">{statDescriptions[key]}</span>
                            </div>
                        ))}
                    </div>
                    <div className="stat-section">
                        <h2>CT-Side Stats</h2>
                        {Object.keys(playerData.stats.ctSide).map((key, index) => (
                            <div className="stat-category" key={index}>
                                <strong>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                                </strong>{' '}
                                {calculateAverage(playerData.stats.ctSide[key])}
                                <span className="tooltip">{statDescriptions[key]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerStats;

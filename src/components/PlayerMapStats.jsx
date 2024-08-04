import React, { useState } from 'react';
import './../Css/PlayerMapStats.css';
import playerMapStatsData from './../Data/playerMapStats.json';

const PlayerMapStats = ({ currentUser }) => {
    const [selectedMap, setSelectedMap] = useState('all');

    if (!currentUser) {
        return <div>Loading ....</div>;
    }
    // This should be an endpoint to fetch the data from the server
    const currentUserData = playerMapStatsData.players.find(player => player.playerName === currentUser.username);

    if (!currentUserData) {
        return <div className="NoDataFound">No data available for this user.</div>;
    }

    const { playerName, maps, profilePicture } = currentUserData;

    const calculateAverageStats = () => {
        const mapNames = Object.keys(maps);
        const totalMaps = mapNames.length;

        const totalStats = mapNames.reduce((acc, map) => {
            const mapStats = maps[map];
            Object.keys(mapStats).forEach((key) => {
                acc[key] = (acc[key] || 0) + mapStats[key];
            });
            return acc;
        }, {});

        const averageStats = {};
        Object.keys(totalStats).forEach((key) => {
            averageStats[key] = totalStats[key] / totalMaps;
        });

        return averageStats;
    };

    const renderMapStats = () => {
        const stats = selectedMap === 'all' ? calculateAverageStats() : maps[selectedMap];

        return (
            <div className="map-stats">
                <h2>{selectedMap === 'all' ? 'Average Stats for All Maps' : `${selectedMap.charAt(0).toUpperCase() + selectedMap.slice(1)} Stats`}</h2>
                <div className="stats-grid">
                    <div className="stat-box"><strong>Kills:</strong> {stats.kills.toFixed(2)}</div>
                    <div className="stat-box"><strong>Deaths:</strong> {stats.deaths.toFixed(2)}</div>
                    <div className="stat-box"><strong>Assists:</strong> {stats.assists.toFixed(2)}</div>
                    <div className="stat-box"><strong>KR:</strong> {stats.kr.toFixed(2)}</div>
                    <div className="stat-box"><strong>KD Ratio:</strong> {stats.kd.toFixed(2)}</div>
                    <div className="stat-box"><strong>ADR:</strong> {stats.adr.toFixed(2)}</div>
                    <div className="stat-box"><strong>CT Rounds:</strong> {stats.ctRounds.toFixed(2)}</div>
                    <div className="stat-box"><strong>T Rounds:</strong> {stats.tRounds.toFixed(2)}</div>
                    <div className="stat-box"><strong>Entry CT:</strong> {stats.entryCT.toFixed(2)}</div>
                    <div className="stat-box"><strong>Entry T:</strong> {stats.entryT.toFixed(2)}</div>
                    <div className="stat-box"><strong>CT Pistol Wins:</strong> {stats.ctPistolWins.toFixed(2)}</div>
                    <div className="stat-box"><strong>T Pistol Wins:</strong> {stats.tPistolWins.toFixed(2)}</div>
                </div>
            </div>
        );
    };

    return (
        <div className="playerMapStats">
            <img src={profilePicture} alt="Profile" className="profile-picture-mapStats" />
            <h1>{playerName}'s Map Stats</h1>
            <div className="mapButtonDiv">
                <button className="mapButtons" onClick={() => setSelectedMap('all')}>All maps</button>
                <button className="mapButtons" onClick={() => setSelectedMap('inferno')}>Inferno</button>
                <button className="mapButtons" onClick={() => setSelectedMap('vertigo')}>Vertigo</button>
                <button className="mapButtons" onClick={() => setSelectedMap('mirage')}>Mirage</button>
                <button className="mapButtons" onClick={() => setSelectedMap('anubis')}>Anubis</button>
                <button className="mapButtons" onClick={() => setSelectedMap('nuke')}>Nuke</button>
                <button className="mapButtons" onClick={() => setSelectedMap('dust2')}>Dust2</button>
                <button className="mapButtons" onClick={() => setSelectedMap('ancient')}>Ancient</button>
            </div>
            {renderMapStats()}
        </div>
    );
};

export default PlayerMapStats;

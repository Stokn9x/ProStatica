import React, { useState, useEffect } from 'react';
import './../Css/PlayerMapStats.css';

const PlayerMapStats = ({ currentUser }) => {
    const [selectedMap, setSelectedMap] = useState('all');
    const [playerMapData, setPlayerMapData] = useState(null);

    useEffect(() => {
        if (currentUser) {
            fetch(`http://localhost:5001/playerMapStats/${currentUser.username}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => setPlayerMapData(data))
                .catch((error) => console.error('Error fetching player data:', error));
        }
    }, [currentUser]);

    if (playerMapData === null) {
        return <div>Loading ....</div>;
    }

    if (!currentUser) {
        return <div>Loading ....</div>;
    }

    // Function to calculate average stats across all maps
    const calculateAverageStats = () => {
        const mapNames = Object.keys(playerMapData.maps);
        let totalMaps = mapNames.length;

        const totalStats = mapNames.reduce((acc, map) => {
            const mapStats = playerMapData.maps[map];
            const mapHasData = Object.values(mapStats).some((values) => Array.isArray(values) && values.length > 0);

            if (mapHasData) {
                Object.keys(mapStats).forEach((key) => {
                    const values = mapStats[key];
                    if (Array.isArray(values) && values.length > 0) {
                        acc[key] = (acc[key] || 0) + values.reduce((a, b) => a + b, 0);
                    }
                });
            } else {
                // If the map has no data, exclude it from the total map count
                totalMaps--;
            }

            return acc;
        }, {});

        const averageStats = {};
        Object.keys(totalStats).forEach((key) => {
            averageStats[key] = totalMaps > 0 ? totalStats[key] / totalMaps : 0;
        });

        return averageStats;
    };

    // Function to calculate stats for a specific map
    const calculateMapStats = (mapStats) => {
        const stats = {};
        Object.keys(mapStats).forEach((key) => {
            const values = mapStats[key];
            if (Array.isArray(values) && values.length > 0) {
                const total = values.reduce((acc, val) => acc + val, 0);
                stats[key] = total / values.length;
            } else {
                stats[key] = 0; // Handle empty arrays by setting the stat to zero
            }
        });
        return stats;
    };

    const renderMapStats = () => {
        const stats = selectedMap === 'all' ? calculateAverageStats() : calculateMapStats(playerMapData.maps[selectedMap]);

        return (
            <div className="map-stats">
                <h2>
                    {selectedMap === 'all'
                        ? 'Average Stats for All Maps'
                        : `${selectedMap.charAt(0).toUpperCase() + selectedMap.slice(1)} Stats`}
                </h2>
                <div className="stats-grid">
                    {Object.keys(stats).map((key) => (
                        <div className="stat-box" key={key}>
                            <strong>
                                {key
                                    .replace(/([A-Z])/g, ' $1')
                                    .replace(/^./, str => str.toUpperCase())}:
                            </strong>{' '}
                            {stats[key].toFixed(2)}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="playerMapStats">
            <img
                src={currentUser.profilePic}
                alt="Profile"
                className="profile-picture-mapStats"
            />
            <h1>{currentUser.username}'s Map Stats</h1>
            <div className="mapButtonDiv">
                {['all', 'inferno', 'vertigo', 'mirage', 'anubis', 'nuke', 'dust2', 'ancient'].map((map) => (
                    <button className="mapButtons" key={map} onClick={() => setSelectedMap(map)}>
                        {map.charAt(0).toUpperCase() + map.slice(1)}
                    </button>
                ))}
            </div>
            {renderMapStats()}
        </div>
    );
};

export default PlayerMapStats;

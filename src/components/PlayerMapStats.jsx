import React, { useState, useMemo, useEffect } from 'react';
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

    console.log(playerMapData.maps);
    if (!currentUser) {
        return <div>Loading ....</div>;
    }

    const calculateAverageStats = useMemo(() => {
        const mapNames = Object.keys(playerMapData.maps);
        const totalMaps = mapNames.length;

        const totalStats = mapNames.reduce((acc, map) => {
            const mapStats = playerMapData.maps[map];
            Object.keys(mapStats).forEach((key) => {
                // Sum up the array values for each stat
                acc[key] = (acc[key] || 0) + mapStats[key].reduce((a, b) => a + b, 0);
            });
            return acc;
        }, {});

        const averageStats = {};
        Object.keys(totalStats).forEach((key) => {
            averageStats[key] = totalStats[key] / totalMaps;
        });

        return averageStats;
    }, [playerMapData.maps]);

    const renderMapStats = () => {
        const stats = selectedMap === 'all' ? calculateAverageStats : PlayerMapData.maps[selectedMap];

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

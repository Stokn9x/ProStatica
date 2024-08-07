import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import './../Css/PlayerMapStats.css';
import playerMapStatsData from './../Data/playerMapStats.json';

const PlayerMapStats = ({ currentUser }) => {
    const [selectedMap, setSelectedMap] = useState('all');

    if (!currentUser) {
        return <div>Loading ....</div>;
    }

    const currentUserData = playerMapStatsData.players.find(player => player.playerName === currentUser.username);

    if (!currentUserData) {
        return <div className="NoDataFound">No data available for this user.</div>;
    }

    const { maps } = currentUserData;

    const calculateAverageStats = useMemo(() => {
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
    }, [maps]);

    const renderMapStats = () => {
        const stats = selectedMap === 'all' ? calculateAverageStats : maps[selectedMap];

        return (
            <div className="map-stats">
                <h2>{selectedMap === 'all' ? 'Average Stats for All Maps' : `${selectedMap.charAt(0).toUpperCase() + selectedMap.slice(1)} Stats`}</h2>
                <div className="stats-grid">
                    {Object.keys(stats).map((key) => (
                        <div className="stat-box" key={key}>
                            <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> {stats[key].toFixed(2)}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="playerMapStats">
            <img src={currentUser.profilePic} alt="Profile" className="profile-picture-mapStats" />
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
/*I will maybe remove this or do it on all the pages soo hmmm*/
PlayerMapStats.propTypes = {
    currentUser: PropTypes.shape({
        username: PropTypes.string.isRequired,
        profilePic: PropTypes.string.isRequired,
    }).isRequired,
};

export default PlayerMapStats;

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './../Css/PlayerStats.css';

// Registrer alle nødvendige komponenter fra Chart.js
Chart.register(...registerables);

const PlayerStats = ({ currentUser }) => {
    const [playerData, setPlayerData] = useState(null);
    const [visibleDatasets, setVisibleDatasets] = useState({
        kd: true,
        kr: true,
        assist: true,
        avg_damage_round: true,
        avg_deaths_round: true,
        avg_kills_round: true,
        avg_utilDamage_round: true,
        damage_armor: true,
        damage_health: true,
        deaths: true,
        first_death: true,
        first_kill: true,
        first_trade_death: true,
        first_trade_kill: true,
        five_kill_count: true,
        four_kill_count: true,
        mvp: true,
        hs: true,
        hs_percentage: true,
        kast: true,
        kills: true,
        one_kill_count: true,
        score: true,
        three_kill_count: true,
        trade_death: true,
        trade_kill: true,
        two_kill_count: true,
        util_damage: true,
        hltv2Rating: true
    });

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

    if (!playerData) {
        return <div>Loading ....</div>;
    }

    const overallStats = playerData.stats.overall;

    // Opdel statistikkerne i sektioner
    const sections = {
        Utility: ['assist', 'avg_utilDamage_round', 'util_damage'],
        Aim: ['hs', 'hs_percentage', 'accuracy'],
        Trades: ['trade_kill', 'trade_death', 'first_trade_kill', 'first_trade_death'],
        Performance: ['kd', 'kr', 'kills', 'deaths', 'mvp', 'hltv2Rating']
    };

    const colors = [
        'rgba(75, 192, 192, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(199, 199, 199, 0.6)'
    ];

    const createChartData = (keys) => {
        if (!overallStats[keys[0]]) {
            return { labels: [], datasets: [] };
        }
        const labels = overallStats[keys[0]].map((_, index) => `Match ${index + 1}`);
        const datasets = keys.map((key, index) => ({
            label: key.charAt(0).toUpperCase() + key.slice(1),
            data: overallStats[key],
            backgroundColor: colors[index % colors.length],
            borderColor: colors[index % colors.length].replace('0.6', '1'),
            borderWidth: 1,
            hidden: !visibleDatasets[key],
        }));
        return {
            labels,
            datasets,
        };
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const toggleDataset = (key) => {
        setVisibleDatasets(prevState => ({
            ...prevState,
            [key]: !prevState[key]
        }));
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
            <div className="stats-overview">
                <h2>Overall Stats</h2>
                {Object.keys(sections).map((section) => (
                    <div key={section} className="stats-section">
                        <h3>{section}</h3>
                        <p>{`This section covers ${section.toLowerCase()} related statistics.`}</p>
                        {sections[section].map((key) => (
                            <button key={key} onClick={() => toggleDataset(key)}>
                                {visibleDatasets[key] ? `Hide ${key}` : `Show ${key}`}
                            </button>
                        ))}
                        <Line data={createChartData(sections[section])} options={options} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlayerStats;



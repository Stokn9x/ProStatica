import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './../Css/MatchDetail.css';

import de_anubis from '/src/assets/Map-Icons/32px-De_anubis.png';
import de_inferno from '/src/assets/Map-Icons/32px-De_inferno.png';
import de_ancient from '/src/assets/Map-Icons/32px-De_ancient.png';
import de_dust2 from '/src/assets/Map-Icons/32px-De_dust2.png';
import de_mirage from '/src/assets/Map-Icons/32px-De_mirage.png';
import de_nuke from '/src/assets/Map-Icons/32px-De_nuke.png';
import de_vertigo from '/src/assets/Map-Icons/32px-De_vertigo.png';

const mapIcons = {
    anubis: de_anubis,
    inferno: de_inferno,
    ancient: de_ancient,
    dust2: de_dust2,
    mirage: de_mirage,
    nuke: de_nuke,
    vertigo: de_vertigo
};

function MatchDetail() {
    const { id } = useParams();
    const [match, setMatch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showRounds, setShowRounds] = useState(false);

    useEffect(() => {
        const fetchMatch = async () => {
            try {
                const response = await fetch(`http://localhost:5001/getMatch/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMatch(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMatch();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!match) return <div>Match not found</div>;

    const { map, result, score, time, mode, rounds, Marchkills = [], yourTeam, enemyTeam } = match;

    const ensureFivePlayers = (team) => {
        const filledTeam = [...team];
        while (filledTeam.length < 5) {
            filledTeam.push({ name: 'Name', kills: '???', deaths: '???', kd: '???', headshots: '???', adr: '???' });
        }
        return filledTeam;
    };

    const yourTeamFilled = ensureFivePlayers(yourTeam);
    const enemyTeamFilled = ensureFivePlayers(enemyTeam);

    const resultClass = result.toLowerCase() === 'victory' ? 'victory' : 'defeat';

    const totalRounds = parseInt(rounds, 10);
    const roundsList = Array.from({ length: totalRounds }, (_, index) => {
        const roundKills = Marchkills.filter(kill => kill.roundNumber[0] === index + 1);
        return {
            roundNumber: index + 1,
            kills: roundKills
        };
    });

    return (
        <div className="match-detail">
            <div className="match-summary">
                <div className="match-info">
                    <img src={mapIcons[map.toLowerCase()]} alt="Map Icon" className="map-icon" />
                    <div className={`match-result ${resultClass}`}>{result} {score}</div>
                    <div className="match-meta">
                        <div>{map.charAt(0).toUpperCase() + map.slice(1)}</div>
                        <div>Game Time {time}</div>
                        <div>{mode}</div>
                    </div>
                </div>
                <div className="tabs">
                    <button className={`tab ${!showRounds ? 'active' : ''}`} onClick={() => setShowRounds(false)}>Overview</button>
                    <button className={`tab ${showRounds ? 'active' : ''}`} onClick={() => setShowRounds(true)}>Rounds</button>
                </div>
            </div>
            {showRounds ? (
                <div className="rounds-list">
                    <h2 className="rounds-title">Match Rounds</h2>
                    <table className="rounds-table">
                        <thead>
                            <tr>
                                <th>Round</th>
                                <th>Kills</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roundsList.map((round, index) => (
                                <tr key={index} className="round-item">
                                    <td className="round-number">Round {round.roundNumber}</td>
                                    <td className="round-kills">
                                        {round.kills.length > 0 ? `${round.kills.length} Kill(s)` : 'No Kills'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="match-stats">
                    <div className="stat-categories">
                        <div className="stat-category">Most Kills</div>
                        <div className="stat-category">Most Deaths</div>
                        <div className="stat-category">Most Headshots</div>
                    </div>
                    <table className="team-stats">
                        <thead>
                            <tr>
                                <th>Your Team - {result === 'Win' ? 'Won' : 'Lost'}</th>
                                <th>Kills</th>
                                <th>Deaths</th>
                                <th>K/D</th>
                                <th>Headshots</th>
                                <th>ADR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {yourTeamFilled.map((player, index) => (
                                <tr key={index}>
                                    <td><img src="/src/assets/Logo/Storm-Logo.jpg" alt="Player Icon" /> {player.name}</td>
                                    <td>{player.kills}</td>
                                    <td>{player.deaths}</td>
                                    <td>{player.kd}</td>
                                    <td>{player.headshots}</td>
                                    <td>{player.adr}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <table className="team-stats">
                        <thead>
                            <tr>
                                <th>Enemy Team - {result === 'Win' ? 'Lost' : 'Won'}</th>
                                <th>Kills</th>
                                <th>Deaths</th>
                                <th>K/D</th>
                                <th>Headshots</th>
                                <th>ADR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enemyTeamFilled.map((player, index) => (
                                <tr key={index}>
                                    <td><img src="/src/assets/Logo/Stokn9x-Logo.jpg" alt="Player Icon" /> {player.name}</td>
                                    <td>{player.kills}</td>
                                    <td>{player.deaths}</td>
                                    <td>{player.kd}</td>
                                    <td>{player.headshots}</td>
                                    <td>{player.adr}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default MatchDetail;

import React from 'react';
import { useParams } from 'react-router-dom';
import './../Css/MatchDetail.css';

import de_anubis from '/src/assets/Map-Icons/32px-De_anubis.png';
import de_inferno from '/src/assets/Map-Icons/32px-De_inferno.png';
import de_ancient from '/src/assets/Map-Icons/32px-De_ancient.png';
import de_dust2 from '/src/assets/Map-Icons/32px-De_dust2.png';
import de_mirage from '/src/assets/Map-Icons/32px-De_mirage.png';
import de_nuke from '/src/assets/Map-Icons/32px-De_nuke.png';
import de_vertigo from '/src/assets/Map-Icons/32px-De_vertigo.png';

import matchData from '/src/Data/matches.json';

const mapIcons = {
    anubis: de_anubis,
    inferno: de_inferno,
    ancient: de_ancient,
    dust2: de_dust2,
    mirage: de_mirage,
    nuke: de_nuke,
    vertigo: de_vertigo
    // Tilføj flere mappings her
};

function MatchDetail() {
    const { id } = useParams();

    // Fetch match details based on the id
    const match = matchData[id];
    if (!match) {
        return <div>Match not found</div>;
    }

    const { map, result, score, time, mode, yourTeam, enemyTeam } = match;

    // Ensure each team has exactly 5 players
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

    return (
        <div className="match-detail">
            <div className="match-summary">
                <div className="match-info">
                    <img src={mapIcons[map]} alt="Map Icon" className="map-icon" />
                    <div className={`match-result ${resultClass}`}>{result} {score}</div>
                    <div className="match-meta">
                        <div>{map.charAt(0).toUpperCase() + map.slice(1)}</div>
                        <div>Game Time {time}</div>
                        <div>{mode}</div>
                    </div>
                </div>
                <div className="tabs">
                    <button className="tab active">Overview</button>
                    <button className="tab">Rounds</button>
                    <button className="tab">Rounds</button>
                </div>
            </div>
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
                            <th>????</th>
                            <th>????</th>
                            <th>????</th>
                            <th>????</th>
                            <th>????</th>
                            <th>????</th>
                            <th>????</th>
                        </tr>
                    </thead>
                    <tbody>
                        {yourTeamFilled.map((player, index) => (
                            <tr key={index}>
                                <td><img src="/src/assets/Logo/2733b5102a8189a8f1e78d33440ed68e216c7be4_full.jpg" alt="Player Icon" /> {player.name}</td>
                                <td>{player.kills}</td>
                                <td>{player.deaths}</td>
                                <td>{player.kd}</td>
                                <td>{player.headshots}</td>
                                <td>{player.adr}</td>
                                <td>???</td>
                                <td>???</td>
                                <td>???</td>
                                <td>???</td>
                                <td>???</td>
                                <td>???</td>
                                <td>???</td>
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
                            <th>????</th>
                            <th>????</th>
                            <th>????</th>
                            <th>????</th>
                            <th>????</th>
                            <th>????</th>
                            <th>????</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enemyTeamFilled.map((player, index) => (
                            <tr key={index}>
                                <td><img src={mapIcons[map]} alt="Player Icon" /> {player.name}</td>
                                <td>{player.kills}</td>
                                <td>{player.deaths}</td>
                                <td>{player.kd}</td>
                                <td>{player.headshots}</td>
                                <td>{player.adr}</td>
                                <td>???</td>
                                <td>???</td>
                                <td>???</td>
                                <td>???</td>
                                <td>???</td>
                                <td>???</td>
                                <td>???</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MatchDetail;
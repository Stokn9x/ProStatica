import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../Css/Matches.css';

function Matches() {
    const navigate = useNavigate();

    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [selectedMap, setSelectedMap] = useState('');

    const handleRowClick = (matchId) => {
        navigate(`/match/${matchId}`);
    };

    const getMapIcon = (type) => {
        switch (type) {
            case "Anubis":
                return "/src/assets/Map-Icons/32px-De_anubis.png";
            case "Inferno":
                return "/src/assets/Map-Icons/32px-De_inferno.png";
            case "Nuke":
                return "/src/assets/Map-Icons/32px-De_nuke.png";
            case "Vertigo":
                return "/src/assets/Map-Icons/32px-De_vertigo.png";
            case "Dust2":
                return "/src/assets/Map-Icons/32px-De_dust2.png";
            case "Mirage":
                return "/src/assets/Map-Icons/32px-De_mirage.png";
            case "Ancient":
                return "/src/assets/Map-Icons/32px-De_ancient.png";
            default:
                return "/src/assets/Map-Icons/default.png"; //Findes ik hehe
        }
    };

    const recentMatches = [
        {
            id: 1,
            map: "Anubis",
            result: "Defeat",
            date: "12/03/2024 20:21",
            gameLength: "21:02",
            mvp: "12:16",
            hltv: "",
            rank: "???",
            kills: 8,
            deaths: 23,
            kd: 0.36,
            aim: "",
            utility: "",
            rating: "",
            shouldHaveWon: "Red team (based on stats)"
        },
        {
            id: 2,
            map: "Inferno",
            result: "Defeat",
            date: "12/03/2024 20:21",
            gameLength: "21:02",
            mvp: "12:16",
            hltv: "",
            rank: "???",
            kills: 8,
            deaths: 22,
            kd: 0.36,
            aim: "",
            utility: "",
            rating: "",
            shouldHaveWon: "Red team (based on stats)"
        }

    ];


    const filteredMatches = recentMatches.filter(match => {
        const matchDate = new Date(match.date);
        if (dateFrom && new Date(dateFrom) > matchDate) return false;
        if (dateTo && new Date(dateTo) < matchDate) return false;
        if (selectedMap && match.map !== selectedMap) return false;

        return true;
    });

    return (
        <div className="matches">
            <h2>Matches</h2>
            <div className="filter">
                <div>
                    <label htmlFor="date-from">From</label>
                    <input type="date" id="date-from" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="date-to">To</label>
                    <input type="date" id="date-to" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="maps">Maps</label>
                    <select id="maps" value={selectedMap} onChange={(e) => setSelectedMap(e.target.value)}>
                        <option value="">Any</option>
                        <option value="Anubis">Anubis</option>
                        <option value="Inferno">Inferno</option>
                        <option value="Vertigo">Vertigo</option>
                        <option value="Nuke">Nuke</option>
                        <option value="Ancient">Ancient</option>
                        <option value="Mirage">Mirage</option>
                        <option value="Dust2">Dust2</option>
                    </select>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Map</th>
                        <th>Win?</th>
                        <th>Date</th>
                        <th>Game Length</th>
                        <th>MVP</th>
                        <th>HLTV</th>
                        <th>Rank</th>
                        <th>Kills</th>
                        <th>Deaths</th>
                        <th>K/D</th>
                        <th>Aim?</th>
                        <th>Utility?</th>
                        <th>Rating?</th>
                        <th>Should have won?</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMatches.map((match, index) => (
                        <tr key={index} onClick={() => handleRowClick(match.id)}>
                            <td><img src={getMapIcon(match.map)} alt="Map Icon" /> {match.map}</td>
                            <td>{match.result}</td>
                            <td>{match.date}</td>
                            <td>{match.gameLength}</td>
                            <td>{match.mvp}</td>
                            <td>{match.hltv}</td>
                            <td>{match.rank}</td>
                            <td>{match.kills}</td>
                            <td>{match.deaths}</td>
                            <td>{match.kd}</td>
                            <td>{match.aim}</td>
                            <td>{match.utility}</td>
                            <td>{match.rating}</td>
                            <td>{match.shouldHaveWon}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Matches;

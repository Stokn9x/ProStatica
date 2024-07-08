import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import matchesData from './../Data/matches.json';
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
        switch (type.toLowerCase()) {
            case "anubis":
                return "/src/assets/Map-Icons/32px-De_anubis.png";
            case "inferno":
                return "/src/assets/Map-Icons/32px-De_inferno.png";
            case "nuke":
                return "/src/assets/Map-Icons/32px-De_nuke.png";
            case "vertigo":
                return "/src/assets/Map-Icons/32px-De_vertigo.png";
            case "dust2":
                return "/src/assets/Map-Icons/32px-De_dust2.png";
            case "mirage":
                return "/src/assets/Map-Icons/32px-De_mirage.png";
            case "ancient":
                return "/src/assets/Map-Icons/32px-De_ancient.png";
            default:
                return "/src/assets/Map-Icons/default.png"; // Default ikon hvis ikke fundet
        }
    };

    const filteredMatches = Object.keys(matchesData).map(matchId => ({
        id: matchId,
        ...matchesData[matchId]
    })).filter(match => {
        const matchDate = new Date(match.time);
        if (dateFrom && new Date(dateFrom) > matchDate) return false;
        if (dateTo && new Date(dateTo) < matchDate) return false;
        if (selectedMap && match.map.toLowerCase() !== selectedMap.toLowerCase()) return false;

        return true;
    });

    return (
        <div className="matches">
            <h2>Matches</h2>
            <div className="filter">
                <div>
                    <label htmlFor="date-from">From</label>
                    <input type="date" id="date-from" onChange={(e) => setDateFrom(e.target.value)} value={dateFrom} />
                </div>
                <div>
                    <label htmlFor="date-to">To</label>
                    <input type="date" id="date-to" onChange={(e) => setDateTo(e.target.value)} value={dateTo} />
                </div>
                <div>
                    <label htmlFor="maps">Maps</label>
                    <select id="maps" onChange={(e) => setSelectedMap(e.target.value)} value={selectedMap}>
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
                    {/*Der skal tilføjes en hel mere data her, såsom scoren på kampen. */}
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
                            <td>{match.win}</td>
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
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Matches.css';

function Matches({ currentUser }) {
    const navigate = useNavigate();

    const [matchesData, setMatchesData] = useState([]);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [selectedMap, setSelectedMap] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const matchesPerPage = 10;

    useEffect(() => {
        fetch('http://localhost:5001/getMatches')
            .then((response) => response.json())
            .then((data) => setMatchesData(data.matches))
            .catch((error) => console.error('Error fetching match data:', error));
    }, []);

    const handleRowClick = (matchId) => {
        navigate(`/match/${matchId}`);
    };

    const getMapIcon = (map) => {
        switch (map.toLowerCase()) {
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
                return "/src/assets/Map-Icons/default.png";
        }
    };

    if (!currentUser || !currentUser.username) {
        return <div>Error: Current user data is not available.</div>;
    }

    const filteredMatches = Object.keys(matchesData)
        .map(matchId => ({
            id: matchId,
            ...matchesData[matchId]
        }))
        .filter(filterMatchesByUser);

    function filterMatchesByUser(match) {
        const matchDate = new Date(match.date);
        const userNormalized = currentUser.username.toLowerCase();
        const yourTeamNormalized = match.yourTeam.map(player => player.name.toLowerCase());

        const isUserInMatch = yourTeamNormalized.includes(userNormalized);

        if (!isUserInMatch) return false;
        if (dateFrom && new Date(dateFrom) > matchDate) return false;
        if (dateTo && new Date(dateTo) < matchDate) return false;
        if (selectedMap && match.map.toLowerCase() !== selectedMap.toLowerCase()) return false;

        return true;
    }

    const indexOfLastMatch = currentPage * matchesPerPage;
    const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
    const currentMatches = filteredMatches.slice(indexOfFirstMatch, indexOfLastMatch);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredMatches.length / matchesPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => (
        <button
            key={number}
            id={number}
            onClick={() => setCurrentPage(number)}
            className={currentPage === number ? 'active' : ''}
        >
            {number}
        </button>
    ));

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
                        <th>Map</th>
                        <th>Result</th>
                        <th>Score</th>
                        <th>Date</th>
                        <th>Game Length</th>
                        <th>MVP</th>
                        <th>HLTV</th>
                        <th>Rank</th>
                        <th>Kills</th>
                        <th>Deaths</th>
                        <th>K/D</th>
                        <th>Aim</th>
                        <th>Utility</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {currentMatches.map((match, index) => (
                        <tr key={index} onClick={() => handleRowClick(match.id)}>
                            <td><img src={getMapIcon(match.map)} alt="Map Icon" /> {match.map}</td>
                            <td>{match.result}</td>
                            <td>{match.score}</td>
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
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                {renderPageNumbers}
            </div>
        </div>
    );
}

export default Matches;

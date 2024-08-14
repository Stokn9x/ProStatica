import React, { useEffect, useState } from 'react';
import '/src/Css/SearchField.css';
import { useNavigate } from 'react-router-dom';

const SearchField = () => {
    const [players, setPlayers] = useState([]);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (query.length > 0) {
            const fetchPlayers = async () => {
                try {
                    const response = await fetch(`http://localhost:5001/getUsers?username=${query}`);
                    if (response.ok) {
                        const data = await response.json();
                        setPlayers(data);
                    } else {
                        setPlayers([]); // Clear players if no match found
                    }
                } catch (error) {
                    console.error('Error fetching players:', error);
                }
            };

            fetchPlayers();
        } else {
            setPlayers([]); // Clear players when query is empty
        }
    }, [query]);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handlePlayerClick = (username) => {
        navigate(`/profile/${username}`); // Navigate to player's profile page
    };

    return (
        <div className="SearchField">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search for players..."
            />
            <ul className="suggestions-list">
                {players.map(player => (
                    <li key={player.username} onClick={() => handlePlayerClick(player.username)}>
                        {player.username}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchField;

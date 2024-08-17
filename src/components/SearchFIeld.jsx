import React, { useEffect, useState, useRef } from 'react';
import '/src/Css/SearchField.css';
import { useNavigate } from 'react-router-dom';

const SearchField = () => {
    const [players, setPlayers] = useState([]);
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate();
    const searchRef = useRef(null);

    useEffect(() => {
        if (query.length > 0) {
            const fetchPlayers = async () => {
                try {
                    const response = await fetch(`http://localhost:5001/getUsersSearch?username=${query}`);
                    if (response.ok) {
                        const data = await response.json();
                        setPlayers(data);
                    } else {
                        setPlayers([]);
                    }
                } catch (error) {
                    console.error('Error fetching players:', error);
                }
            };

            fetchPlayers();
        } else {
            setPlayers([]);
        }
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsFocused(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [searchRef]);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        setIsFocused(true);
    };

    const handlePlayerClick = (username) => {
        navigate(`/profile/${username}`);
        setQuery(''); // Clear search after selection
        setIsFocused(false);
    };

    const highlightMatch = (username, query) => {
        const parts = username.split(new RegExp(`(${query})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? <strong key={index}>{part}</strong> : part
        );
    };
    console.log(players)
    return (
        <div className="SearchField" ref={searchRef}>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search for players..."
                onFocus={() => setIsFocused(true)}
            />
            {isFocused && query && (
                <ul className="suggestions-list">
                    {players.map(player => (
                        <li key={player.username} onClick={() => handlePlayerClick(player.username)}>
                            <span className="text-content">
                                {highlightMatch(player.username, query)}
                            </span>
                            <img src={player.profilePic} alt="img" className="searchLogo" />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchField;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './../Css/SignUp.css';

function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5001/getAllUsers');
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    console.error('Failed to fetch users');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUsers();
    }, []);

    console.log(users);

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== retypePassword) {
            alert('Passwords do not match');
            return;
        }

        if (users.some(user => user.email === email)) {
			alert('Email is taken, you have an account with us :)');
			return;
		}

        const newUser = {
            username,
            email,
            password,
            rank: "Unranked",
            name: "none",
            age: "none",
            role: "none",
            profilePic: "/src/assets/Logo/Placeholder.jpg",
            bannerPic: "/src/assets/Banner/placeholder-banner.jpg",
            bio: "none",
            location: "none",
            firstLogin: true,
            friends: [],
            "friendRequests": [],
            socialMedia: {
                "faceit": "none",
                "twitter": "none",
                "instagram": "none"
            },
            signupTime: `${day}-${month}-${year}`,
            "currentTeam": "none",
            "previousTeams": [
                "none"
            ]
        };

        const newMapStats = {
            playerName: username,
            maps: {
                inferno: {
                    "kills": [],
                    "deaths": [],
                    "assists": [],
                    "kr": [],
                    "kd": [],
                    "adr": [],
                    "ctRounds": [],
                    "tRounds": [],
                    "entryCT": [],
                    "entryT": [],
                    "ctPistolWins": [],
                    "tPistolWins": []
                },
                vertigo: {
                    "kills": [],
                    "deaths": [],
                    "assists": [],
                    "kr": [],
                    "kd": [],
                    "adr": [],
                    "ctRounds": [],
                    "tRounds": [],
                    "entryCT": [],
                    "entryT": [],
                    "ctPistolWins": [],
                    "tPistolWins": []
                },
                anubis: {
                    "kills": [],
                    "deaths": [],
                    "assists": [],
                    "kr": [],
                    "kd": [],
                    "adr": [],
                    "ctRounds": [],
                    "tRounds": [],
                    "entryCT": [],
                    "entryT": [],
                    "ctPistolWins": [],
                    "tPistolWins": []
                },
                mirage: {
                    "kills": [],
                    "deaths": [],
                    "assists": [],
                    "kr": [],
                    "kd": [],
                    "adr": [],
                    "ctRounds": [],
                    "tRounds": [],
                    "entryCT": [],
                    "entryT": [],
                    "ctPistolWins": [],
                    "tPistolWins": []
                },
                dust2: {
                    "kills": [],
                    "deaths": [],
                    "assists": [],
                    "kr": [],
                    "kd": [],
                    "adr": [],
                    "ctRounds": [],
                    "tRounds": [],
                    "entryCT": [],
                    "entryT": [],
                    "ctPistolWins": [],
                    "tPistolWins": []
                },
                ancient: {
                    "kills": [],
                    "deaths": [],
                    "assists": [],
                    "kr": [],
                    "kd": [],
                    "adr": [],
                    "ctRounds": [],
                    "tRounds": [],
                    "entryCT": [],
                    "entryT": [],
                    "ctPistolWins": [],
                    "tPistolWins": []
                },
                nuke: {
                    "kills": [],
                    "deaths": [],
                    "assists": [],
                    "kr": [],
                    "kd": [],
                    "adr": [],
                    "ctRounds": [],
                    "tRounds": [],
                    "entryCT": [],
                    "entryT": [],
                    "ctPistolWins": [],
                    "tPistolWins": []
                },
            }
        };

        const newUserStats = {
            playerName: username,
            stats: {
                overall: {
                    assist: [],
                    avg_damage_round: [],
                    avg_deaths_round: [],
                    avg_kills_round: [],
                    avg_utilDamage_round: [],
                    damage_armor: [],
                    damage_health: [],
                    deaths: [],
                    first_death: [],
                    first_kill: [],
                    first_trade_death: [],
                    first_trade_kill: [],
                    five_kill_count: [],
                    four_kill_count: [],
                    mvp: [],
                    hs: [],
                    hs_percentage: [],
                    kast: [],
                    kills: [],
                    kd: [],
                    one_kill_count: [],
                    score: [],
                    three_kill_count: [],
                    trade_death: [],
                    trade_kill: [],
                    two_kill_count: [],
                    util_damage: [],
                    hltv2Rating: []
                },
                tSide: {
                    tRounds: [],
                    killR: [],
                    gunRound: []
                },
                ctSide: {
                    tRounds: [],
                    killR: [],
                    gunRound: []
                }
			}
        };

        try {
            const response = await fetch('http://localhost:5001/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newUser, newMapStats, newUserStats }),
            });

            if (response.ok) {
                alert('Signup successful!');
                navigate('/login');
            } else {
                alert('Signup failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during signup');
        }
    };

    console.log("hejsa");

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo">
                    <h1>MyApp</h1>
                </div>
                <div className="welcome-message">
                    <h2>Join the heart of Counter-Strike statistics</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        className="login-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="login-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="login-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Retype Password"
                        className="login-input"
                        value={retypePassword}
                        onChange={(e) => setRetypePassword(e.target.value)}
                    />
                    <button type="submit" className="login-button">Sign up</button>
                </form>
            </div>
        </div>

    );
}

export default SignUp;

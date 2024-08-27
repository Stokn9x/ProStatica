import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { sendResetCode, sendWelcomeEmail } from './../Services/emailService.js';
import { dirname } from 'path';

const app = express();
const PORT = 5001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(cors());

const teamsDataPath = path.join(__dirname, '..', 'Data', 'teams.json');
const usersDataPath = path.join(__dirname, '..', 'Data', 'users.json');
const playerStatsDataPath = path.join(__dirname, '..', 'Data', 'playerStats.json');
const playerMapStatsDataPath = path.join(__dirname, '..', 'Data', 'playerMapStats.json')
const matchesDataPath = path.join(__dirname, '..', 'Data', 'matches.json');

const updateUser = (usersData, username, updateCallback) => {
	const userIndex = usersData.users.findIndex(user => user.username === username);
	if (userIndex !== -1) {
		updateCallback(usersData.users[userIndex]);
	}
};

app.get('/getMatch/:id', (req, res) => {
	const { id } = req.params;

	fs.readFile(matchesDataPath, 'utf8', (err, data) => {
		if (err) {
			console.error('Error reading match data:', err);
			return res.status(500).send('An error occurred while reading match data.');
		}

		try {
			const matchesData = JSON.parse(data);

			if (!matchesData.matches || !matchesData.matches[id]) {
				return res.status(404).json({ message: 'Match not found' });
			}

			const match = matchesData.matches[id];
			res.status(200).json(match);
		} catch (parseError) {
			console.error('Error parsing match data:', parseError);
			res.status(500).send('An error occurred while processing match data.');
		}
	});
});

app.get('/getMatches', (req, res) => {
	fs.readFile(matchesDataPath, 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			return res.status(500).send('An error occurred while reading match data.');
		}

		try {
			const matchesData = JSON.parse(data);
			res.status(200).json(matchesData);
		} catch (parseError) {
			console.error('Error parsing match data:', parseError);
			res.status(500).send('An error occurred while processing match data.');
		}
	});
});

app.get('/getUsersSearch', (req, res) => {
	const { username } = req.query;

	fs.readFile(usersDataPath, 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send('An error occurred while reading user data.');
			return;
		}

		const usersData = JSON.parse(data);
		const filteredUsers = usersData.users.filter(user =>
			user.username.toLowerCase().startsWith(username.toLowerCase())
		);

		if (filteredUsers.length === 0) {
			res.status(404).send('No users found.');
			return;
		}

		res.status(200).json(filteredUsers);
	});
});

app.get('/getAllUsers', (req, res) => {
	fs.readFile(usersDataPath, 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send('An error occurred while reading user data.');
			return;
		}

		const usersData = JSON.parse(data);
		res.status(200).json(usersData.users);
	});
});

app.get('/getUser/:username', (req, res) => {
	const { username } = req.params;

	fs.readFile(usersDataPath, 'utf8', (err, data) => {
		if (err) {
			console.error('Error reading user data:', err);
			return res.status(500).json({ message: 'An error occurred while reading user data.' });
		}

		try {
			const usersData = JSON.parse(data);
			const user = usersData.users.find(user => user.username === username);

			if (!user) {
				return res.status(404).json({ message: 'User not found.' });
			}

			res.status(200).json(user);
		} catch (parseError) {
			console.error('Error parsing user data:', parseError);
			res.status(500).json({ message: 'An error occurred while processing user data.' });
		}
	});
});

app.get('/getUserByEmail/:email', (req, res) => {
	const { email } = req.params;

	fs.readFile(usersDataPath, 'utf8', (err, data) => {
		if (err) {
			console.error('Error reading user data:', err);
			return res.status(500).json({ message: 'An error occurred while reading user data.' });
		}

		try {
			const usersData = JSON.parse(data);
			const user = usersData.users.find(user => user.email === email);

			if (!user) {
				return res.status(404).json({ message: 'User not found.' });
			}

			const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

			sendResetCode(email, resetCode);

			res.status(200).json({ message: 'Reset code sent to email.' });
		} catch (parseError) {
			console.error('Error parsing user data:', parseError);
			res.status(500).json({ message: 'An error occurred while processing user data.' });
		}
	});
});

app.post('/signup', (req, res) => {
	const { newUser, newMapStats, newUserStats } = req.body;

	fs.readFile(usersDataPath, 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send('An error occurred while reading user data.');
			return;
		}

		const usersData = JSON.parse(data);
		usersData.users.push(newUser);

		fs.writeFile(usersDataPath, JSON.stringify(usersData, null, 2), (err) => {
			if (err) {
				console.error(err);
				res.status(500).send('An error occurred while saving user data.');
				return;
			}

			fs.readFile(playerMapStatsDataPath, 'utf8', (err, data) => {
				if (err) {
					console.error(err);
					res.status(500).send('An error occurred while reading map stats data.');
					return;
				}

				const mapStatsData = JSON.parse(data);
				mapStatsData.players.push(newMapStats);

				fs.writeFile(playerMapStatsDataPath, JSON.stringify(mapStatsData, null, 2), (err) => {
					if (err) {
						console.error(err);
						res.status(500).send('An error occurred while saving map stats data.');
						return;
					}

					fs.readFile(playerStatsDataPath, 'utf8', (err, data) => {
						if (err) {
							console.error(err);
							res.status(500).send('An error occurred while reading user stats data.');
							return;
						}

						const userStatsData = JSON.parse(data);
						userStatsData.players.push(newUserStats);

						fs.writeFile(playerStatsDataPath, JSON.stringify(userStatsData, null, 2), (err) => {
							if (err) {
								console.error(err);
								res.status(500).send('An error occurred while saving user stats data.');
								return;
							}

							sendWelcomeEmail(newUser.email, newUser.username);

							res.status(200).send('Signup successful!');
						});
					});
				});
			});
		});
	});
});

app.post('/updateProfile', (req, res) => {
	const updatedUser = req.body;

	fs.readFile(usersDataPath, 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send('An error occurred while reading user data.');
			return;
		}

		const usersData = JSON.parse(data);
		const userIndex = usersData.users.findIndex(user => user.username === updatedUser.username);

		if (userIndex === -1) {
			res.status(404).send('User not found.');
			return;
		}

		usersData.users[userIndex] = updatedUser;

		fs.writeFile(usersDataPath, JSON.stringify(usersData, null, 2), (err) => {
			if (err) {
				console.error(err);
				res.status(500).send('An error occurred while saving user data.');
				return;
			}

			res.status(200).send('Profile updated successfully!');
		});
	});
});

app.post('/createTeam', (req, res) => {
	const newTeam = req.body;

	fs.readFile(teamsDataPath, 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send('An error occurred while reading team data.');
			return;
		}

		const teamsData = JSON.parse(data);

		//this is not nullable so we need to check if it is null
		const teamExists = teamsData.teams.some(team => team.teamName.toLowerCase() === newTeam.teamName.toLowerCase());

		if (teamExists) {
			res.status(400).send('A team with this name already exists.');
			return;
		}

		teamsData.teams.push(newTeam);

		fs.writeFile(teamsDataPath, JSON.stringify(teamsData, null, 2), (err) => {
			if (err) {
				console.error(err);
				res.status(500).send('An error occurred while saving team data.');
				return;
			}

			// Update user's current team
			fs.readFile(usersDataPath, 'utf8', (err, userData) => {
				if (err) {
					console.error(err);
					res.status(500).send('An error occurred while reading user data.');
					return;
				}

				const usersData = JSON.parse(userData);
				updateUser(usersData, newTeam.members[0].username, (user) => {
					user.currentTeam = newTeam.teamName;
				});

				fs.writeFile(usersDataPath, JSON.stringify(usersData, null, 2), (err) => {
					if (err) {
						console.error(err);
						res.status(500).send('An error occurred while updating user data.');
						return;
					}

					res.status(200).send('Team creation was successful!');
				});
			});
		});
	});
});

app.post('/joinTeam', (req, res) => {
	const { teamCode, user } = req.body;

	if (!user || !user.username || !user.name || !user.age || !user.role) {
		res.status(400).send('Invalid user data.');
		return;
	}

	fs.readFile(teamsDataPath, 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send('An error occurred while reading team data.');
			return;
		}

		const teamsData = JSON.parse(data);
		const teamIndex = teamsData.teams.findIndex(team => team.teamCode === teamCode);

		if (teamIndex === -1) {
			res.status(404).send('Team not found.');
			return;
		}

		const team = teamsData.teams[teamIndex];

		const isAlreadyMember = team.members.some(member => member.username === user.username);

		if (isAlreadyMember) {
			res.status(400).send('You are already a member of this team.');
			return;
		}

		if (user && Object.keys(user).length > 0) {
			team.members.push(user);
		}

		fs.writeFile(teamsDataPath, JSON.stringify(teamsData, null, 2), (err) => {
			if (err) {
				console.error(err);
				res.status(500).send('An error occurred while saving team data.');
				return;
			}

			fs.readFile(usersDataPath, 'utf8', (err, userData) => {
				if (err) {
					console.error(err);
					res.status(500).send('An error occurred while reading user data.');
					return;
				}

				const usersData = JSON.parse(userData);
				updateUser(usersData, user.username, (user) => {
					user.currentTeam = team.teamName;
				});

				fs.writeFile(usersDataPath, JSON.stringify(usersData, null, 2), (err) => {
					if (err) {
						console.error(err);
						res.status(500).send('An error occurred while updating user data.');
						return;
					}

					res.status(200).json({ message: 'You joined the team successfully!', team });
				});
			});
		});
	});
});

app.post('/leaveTeam', (req, res) => {
	const { username } = req.body;

	fs.readFile(usersDataPath, 'utf8', (err, userData) => {
		if (err) {
			console.error(err);
			res.status(500).send('An error occurred while reading user data.');
			return;
		}

		const usersData = JSON.parse(userData);
		const userIndex = usersData.users.findIndex(user => user.username === username);

		if (userIndex === -1) {
			res.status(404).send('User not found.');
			return;
		}

		const user = usersData.users[userIndex];
		const currentTeam = user.currentTeam;

		if (!currentTeam || currentTeam === 'none') {
			res.status(400).send('User is not part of any team.');
			return;
		}

		fs.readFile(teamsDataPath, 'utf8', (err, teamData) => {
			if (err) {
				console.error(err);
				res.status(500).send('An error occurred while reading team data.');
				return;
			}

			const teamsData = JSON.parse(teamData);
			const teamIndex = teamsData.teams.findIndex(team => team.teamName === currentTeam);

			if (teamIndex === -1) {
				res.status(404).send('Team not found.');
				return;
			}

			const team = teamsData.teams[teamIndex];
			const memberIndex = team.members.findIndex(member => member.username === username);

			if (memberIndex === -1) {
				res.status(404).send('User is not a member of this team.');
				return;
			}

			team.members.splice(memberIndex, 1);

			if (team.members.length === 0) {
				teamsData.teams.splice(teamIndex, 1);
			}

			fs.writeFile(teamsDataPath, JSON.stringify(teamsData, null, 2), (err) => {
				if (err) {
					console.error(err);
					res.status(500).send('An error occurred while saving team data.');
					return;
				}

				updateUser(usersData, username, updatedUser => {
					updatedUser.currentTeam = 'none';
					if (!updatedUser.previousTeams.includes(currentTeam)) {
						updatedUser.previousTeams.push(currentTeam);
					}
				});

				fs.writeFile(usersDataPath, JSON.stringify(usersData, null, 2), (err) => {
					if (err) {
						console.error(err);
						res.status(500).send('An error occurred while saving user data.');
						return;
					}

					res.status(200).json({ message: 'Successfully left the team.', teamName: currentTeam });
				});
			});
		});
	});
});

app.get('/getTeamInfo', (req, res) => {
	const { team } = req.query;

	fs.readFile(teamsDataPath, 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send('An error occurred while reading team data.');
			return;
		}

		const teamsData = JSON.parse(data);
		const teamData = teamsData.teams.find(t => t.teamName === team);

		if (!teamData) {
			res.status(404).send('Team not found.');
			return;
		}

		// Send the entire team data
		res.status(200).json(teamData);
	});
});

app.post('/updateFirstLogin', (req, res) => {
	const { username } = req.body;

	fs.readFile(usersDataPath, 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			return res.status(500).send('An error occurred while reading user data.');
		}

		const usersData = JSON.parse(data);
		const userIndex = usersData.users.findIndex(user => user.username === username);

		if (userIndex === -1) {
			return res.status(404).send('User not found.');
		}

		usersData.users[userIndex].firstLogin = false;

		fs.writeFile(usersDataPath, JSON.stringify(usersData, null, 2), (err) => {
			if (err) {
				console.error(err);
				return res.status(500).send('An error occurred while saving user data.');
			}

			res.status(200).send('firstLogin status updated successfully!');
		});
	});
});

app.get('/playerStats/:username', (req, res) => {
	const { username } = req.params;

	fs.readFile(playerStatsDataPath, 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			return res.status(500).send('An error occurred while reading player stats data.');
		}

		const playersData = JSON.parse(data);
		const player = playersData.players.find(player => player.playerName === username);

		if (!player) {
			return res.status(404).send('Player not found.');
		}

		res.status(200).json(player);
	});
});

app.get('/playerMapStats/:username', (req, res) => {
	const { username } = req.params;

	fs.readFile(playerMapStatsDataPath, 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			return res.status(500).send('An error occurred while reading player map stats data.');
		}

		const playerMapData = JSON.parse(data);
		const player = playerMapData.players.find(player => player.playerName === username)

		if (!player) {
			return res.status(404).send('Player not found.')
		}

		res.status(200).json(player);
	});
});

app.post('/sendFriendRequest', (req, res) => {
	const { senderUsername, receiverUsername } = req.body;

	fs.readFile(usersDataPath, 'utf8', (err, data) => {
		if (err) {
			console.error('Error reading user data:', err);
			return res.status(500).send('An error occurred while reading user data.');
		}

		const usersData = JSON.parse(data);
		const sender = usersData.users.find(user => user.username === senderUsername);
		const receiver = usersData.users.find(user => user.username === receiverUsername);

		if (!receiver) {
			return res.status(404).send('Receiver not found.');
		}

		if (!sender) {
			return res.status(404).send('Sender not found.');
		}

		if (receiver.friendRequests.includes(senderUsername)) {
			return res.status(400).send('Friend request already sent.');
		}

		receiver.friendRequests.push(senderUsername);

		fs.writeFile(usersDataPath, JSON.stringify(usersData, null, 2), (err) => {
			if (err) {
				console.error('Error saving user data:', err);
				return res.status(500).send('An error occurred while saving user data.');
			}

			res.status(200).send('Friend request sent!');
		});
	});
});
app.post('/acceptFriendRequest', (req, res) => {
	const { username, senderUsername } = req.body;

	fs.readFile(usersDataPath, 'utf8', (err, data) => {
		if (err) {
			console.error('Error reading user data:', err);
			return res.status(500).send('An error occurred while reading user data.');
		}

		const usersData = JSON.parse(data);
		const user = usersData.users.find(user => user.username === username);
		const sender = usersData.users.find(user => user.username === senderUsername);

		if (!user || !sender) {
			return res.status(404).send('User not found.');
		}

		user.friendRequests = user.friendRequests.filter(req => req !== senderUsername);
		user.friends.push(senderUsername);
		sender.friends.push(username);

		fs.writeFile(usersDataPath, JSON.stringify(usersData, null, 2), (err) => {
			if (err) {
				console.error('Error saving user data:', err);
				return res.status(500).send('An error occurred while saving user data.');
			}

			res.status(200).send('Friend request accepted!');
		});
	});
});

app.post('/declineFriendRequest', (req, res) => {
	const { username, senderUsername } = req.body;

	fs.readFile(usersDataPath, 'utf8', (err, data) => {
		if (err) {
			console.error('Error reading user data:', err);
			return res.status(500).send('An error occurred while reading user data.');
		}

		const usersData = JSON.parse(data);
		const user = usersData.users.find(user => user.username === username);

		if (!user) {
			return res.status(404).send('User not found.');
		}

		user.friendRequests = user.friendRequests.filter(req => req !== senderUsername);

		fs.writeFile(usersDataPath, JSON.stringify(usersData, null, 2), (err) => {
			if (err) {
				console.error('Error saving user data:', err);
				return res.status(500).send('An error occurred while saving user data.');
			}

			res.status(200).send('Friend request declined!');
		});
	});
});

app.post('/getFriendRequests', (req, res) => {
	const { username } = req.body;

	fs.readFile(usersDataPath, 'utf8', (err, data) => {
		if (err) {
			console.error('Error reading user data:', err);
			return res.status(500).send('An error occurred while reading user data.');
		}

		const usersData = JSON.parse(data);
		const user = usersData.users.find(user => user.username === username);

		if (!user) {
			return res.status(404).send('User not found.');
		}

		// Returner venneanmodningerne for den fundne bruger
		res.status(200).json(user.friendRequests);
	});
});




app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
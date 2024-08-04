import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = 5001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.json());
app.use(cors());

const teamsDataPath = path.join(__dirname, '..', 'Data', 'teams.json');
const usersDataPath = path.join(__dirname, '..', 'Data', 'users.json');


const updateUser = (usersData, username, updateCallback) => {
	const userIndex = usersData.users.findIndex(user => user.username === username);
	if (userIndex !== -1) {
		updateCallback(usersData.users[userIndex]);
	}
};

app.get('/getUser/:username', (req, res) => {
	const { username } = req.params;

	fs.readFile(usersDataPath, 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send('An error occurred while reading user data.');
			return;
		}

		const usersData = JSON.parse(data);
		const user = usersData.users.find(user => user.username === username);

		if (!user) {
			res.status(404).send('User not found.');
			return;
		}

		res.status(200).json(user);
	});
});

app.post('/signup', (req, res) => {
	const newUser = req.body;

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

			res.status(200).send('Signup successful!');
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

		if (user && Object.keys(user).length > 0) {
			team.members.push(user);
		}

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

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
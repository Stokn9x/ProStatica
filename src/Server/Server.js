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

            res.status(200).send('Team creation was successful!');
        });
    });
});

app.post('/joinTeam', (req, res) => {
    const { teamCode, user } = req.body;

    console.log('Received join request:', req.body);

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
        console.log('Before joining:', team);
        if (user && Object.keys(user).length > 0) {
            team.members.push(user);
        }
        console.log('After joining:', team);

        fs.writeFile(teamsDataPath, JSON.stringify(teamsData, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('An error occurred while saving team data.');
                return;
            }

            res.status(200).send('You joined the team successfully!');
        });
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
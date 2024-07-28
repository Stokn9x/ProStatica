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

app.post('/signup', (req, res) => {
    const newUser = req.body;

    const dataPath = path.join(__dirname, '..', 'Data', 'users.json'); 
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred while reading user data.');
            return;
        }

        const usersData = JSON.parse(data);
        usersData.users.push(newUser);

        fs.writeFile(dataPath, JSON.stringify(usersData, null, 2), (err) => {
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

    const dataPath = path.join(__dirname, '..', 'Data', 'users.json');
    fs.readFile(dataPath, 'utf8', (err, data) => {
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

        fs.writeFile(dataPath, JSON.stringify(usersData, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('An error occurred while saving user data.');
                return;
            }

            res.status(200).send('Profile updated successfully!');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

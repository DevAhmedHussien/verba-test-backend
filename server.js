const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const PORT = 3001;
const crypto = require('crypto');
const SECRET_KEY = crypto.randomBytes(32).toString('hex');

const users = [
    { username: 'admin', password: bcrypt.hashSync('admin', 10) },
    { username: 'ahmed', password: bcrypt.hashSync('ahmed', 10) },
    { username: 'amer', password: bcrypt.hashSync('amer', 10) },
    { username: 'radwa', password: bcrypt.hashSync('radwa', 10) },
];

app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.listen(PORT);

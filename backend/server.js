// server.js
// This is the entry point of the entire Express app — when you run `node server.js`,
// This is the first file that gets executed.

require('dotenv').config(); //.env file se DB_HOST, DB_USER, PORT waghera load karta hai

const express = require('express');
const cors = require('cors');

const studentRoutes = require('./src/routes/studentRoutes');

const app = express();

// ------- Middlewares (every request passes through these before reaching the routes -----------

app.use(cors());
app.use(express.json());

app.use('/api/students', studentRoutes);

//it's check for server is live
app.get('/', (req, res) => {
    res.send('Student Management API is running.....');
});

// ------404 handler (if any wrong route his this) --------
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// ----- This is for Server start ------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is running on: http://localhost:${PORT}');
});
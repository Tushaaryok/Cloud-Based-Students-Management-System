// server.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const studentRoutes = require('./src/routes/studentRoutes');
const attendanceRoutes = require('./src/routes/attendanceRoutes');   // ← naya
const subjectRoutes = require('./src/routes/subjectRoutes');         // ← naya
const resultRoutes = require('./src/routes/resultRoutes');           // ← naya

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);   // ← naya
app.use('/api/subjects', subjectRoutes);        // ← naya
app.use('/api/results', resultRoutes);          // ← naya

app.get('/', (req, res) => {
    res.send('Student Management API is running.....');
});

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is running on: http://localhost:${PORT}');
});
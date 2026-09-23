// config/database.js
//This is use for "connection pool" to MySql
// A pool use for multiple request are efficiently

const mysql = require('mysql2/promise'); //promise version is use for easily use async/await.

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database:  process.env.DB_NAME || 'student_management',
    waitForConnections: true,
    connectionLimit: 10,

});

module.exports = pool;
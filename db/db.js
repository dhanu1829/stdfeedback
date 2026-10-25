const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost8080',
    user: process.env.DB_USER || 'dhanu',
    password: process.env.DB_PASSWORD || 'dhanu@18',
    database: process.env.DB_NAME || 'student_feedback_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();

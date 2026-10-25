const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// 1. Submit Feedback Route
app.post('/api/feedback', async (req, res) => {
    const { studentName, studentId, facultyId, courseName, rating, comments } = req.body;

    if (!studentName || !studentId || !facultyId || !rating) {
        return res.status(400).json({ error: 'Please fill out all required fields.' });
    }

    try {
        const query = `
            INSERT INTO feedback (student_name, student_id, faculty_id, course_name, rating, comments)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.execute(query, [studentName, studentId, facultyId, courseName, rating, comments]);
        res.status(201).json({ message: 'Feedback submitted successfully!', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to process feedback.' });
    }
});

// 2. Fetch All Faculty Members
app.get('/api/faculty', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM faculty');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch faculty list.' });
    }
});

// 3. Get Reports & Summary Data
app.get('/api/reports', async (req, res) => {
    try {
        const query = `
            SELECT 
                f.name AS faculty_name,
                f.department,
                COUNT(fb.id) AS total_feedbacks,
                ROUND(AVG(fb.rating), 2) AS average_rating
            FROM faculty f
            LEFT JOIN feedback fb ON f.id = fb.faculty_id
            GROUP BY f.id
        `;
        const [reports] = await db.query(query);
        res.json(reports);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve report analytics.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
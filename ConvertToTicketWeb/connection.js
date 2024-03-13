// Assuming you're using Node.js with Express framework

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 53516; // Your server port

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// MySQL database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'users'
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

// API endpoint to receive email data
app.post('/api/sendEmailData', (req, res) => {
    const emailData = req.body;

    // SQL query to insert email data into a table
    const sql = `INSERT INTO emails (to_email, subject, body, cc, bcc) VALUES (?, ?, ?, ?, ?)`;

    // Execute the SQL query with emailData values
    connection.query(sql, [emailData.to, emailData.subject, emailData.body, JSON.stringify(emailData.cc), JSON.stringify(emailData.bcc)], (err, result) => {
        if (err) {
            console.error('Error inserting email data:', err);
            res.status(500).send('Error inserting email data');
            return;
        }
        console.log('Email data inserted successfully');
        res.status(200).send('Email data inserted successfully');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// POST endpoint
app.post('/api/data', (req, res) => {
    const data = req.body;
    const response = {
        status: 'success',
        user_id: data.user_id || null,
        college_email_id: data.college_email_id || null,
        college_roll_number: data.college_roll_number || null,
        numbers: [],
        alphabets: [],
        highest_lowercase_alphabet: []
    };

    if (Array.isArray(data.numbers)) {
        response.numbers = data.numbers.filter(num => typeof num === 'number');
    }

    if (Array.isArray(data.alphabets)) {
        response.alphabets = data.alphabets.filter(char => typeof char === 'string' && /^[a-zA-Z]$/.test(char));
    }

    if (Array.isArray(data.alphabets)) {
        const lowercaseAlphabets = data.alphabets.filter(char => char === char.toLowerCase());
        if (lowercaseAlphabets.length > 0) {
            const highest = lowercaseAlphabets.reduce((max, char) => char > max ? char : max, 'a');
            response.highest_lowercase_alphabet = [highest];
        }
    }

    res.json(response);
});

// GET endpoint
app.get('/api/operation', (req, res) => {
    res.json({ operation_code: 'OP123' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

const { parse } = require('querystring');

exports.handler = async (event) => {
    try {
        const data = JSON.parse(event.body);
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

        return {
            statusCode: 200,
            body: JSON.stringify(response)
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid request' })
        };
    }
};

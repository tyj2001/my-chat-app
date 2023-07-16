module.exports = async (req, res) => {
    const fetch = require('node-fetch');

    const response = await fetch('https://purgpt.xyz/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            messages: req.body.messages,
            key: process.env.API_KEY,
            model: 'gpt-4.0'
        }),
    });

    const data = await response.json();
    res.json(data);
}

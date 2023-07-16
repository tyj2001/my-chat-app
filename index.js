const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/chat', async (req, res) => {
  const userInput = req.body.text;

  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: userInput,
      max_tokens: 100,
    }, {
        headers: {
          'Authorization': `Bearer ${process.env.PURGPT_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const generatedText = response.data.choices[0].text.trim()

    res.json({ text: generatedText });
  } catch (e) {
    console.error(e);
    res.status(500).send('Something went wrong while fetching the AI response');
  }
});

app.listen(3000, () => console.log('Listening on port 3000'));

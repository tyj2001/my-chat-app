const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const apiUrl = `https://purgpt.xyz/v1/chat/completions`;
    const apiRes = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'username': req.headers.username,
        'turing-key': req.headers['turing-key']
      },
      data: req.body
    });
    res.json(apiRes.data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

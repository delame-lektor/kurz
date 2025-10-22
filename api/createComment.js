const axios = require('axios');

module.exports = async (req, res) => {
  const { FRELO_EMAIL, FRELO_API_KEY } = process.env;
  const { taskId, comment } = req.body;

  if (!taskId || !comment) {
    return res.status(400).json({ error: 'Missing taskId or comment' });
  }

  try {
    const response = await axios.post(
      `https://api.freelo.io/v1/comments`,
      {
        taskId,
        comment
      },
      {
        auth: {
          username: FRELO_EMAIL,
          password: FRELO_API_KEY,
        },
        headers: {
          'User-Agent': 'GPT-Freelo-Proxy (you@example.com)',
        },
      }
    );

    res.status(201).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: err.message,
      details: err.response?.data || null,
    });
  }
};

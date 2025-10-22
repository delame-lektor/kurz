const axios = require('axios');

module.exports = async (req, res) => {
  const { FRELO_EMAIL, FRELO_API_KEY } = process.env;
  const { projectId, name } = req.body;

  if (!projectId || !name) {
    return res.status(400).json({ error: 'Missing projectId or name' });
  }

  try {
    const response = await axios.post(
      `https://api.freelo.io/v1/tasklists`,
      {
        projectId,
        name
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

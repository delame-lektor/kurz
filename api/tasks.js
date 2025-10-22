const axios = require('axios');

module.exports = async (req, res) => {
  const { FRELO_EMAIL, FRELO_API_KEY } = process.env;
  const { projectId } = req.query;

  if (!projectId) {
    return res.status(400).json({ error: 'Missing projectId' });
  }

  try {
    const response = await axios.get(
      `https://api.freelo.io/v1/project/${projectId}/tasks`,
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

    res.status(200).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: err.message,
      details: err.response?.data || null,
    });
  }
};


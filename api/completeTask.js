const axios = require('axios');

module.exports = async (req, res) => {
  const { FRELO_EMAIL, FRELO_API_KEY } = process.env;
  const { taskId } = req.body;

  if (!taskId) {
    return res.status(400).json({ error: 'Missing taskId' });
  }

  try {
    const response = await axios.post(
      `https://api.freelo.io/v1/task-completed/${taskId}`,
      {},
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

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: err.message,
      details: err.response?.data || null,
    });
  }
};

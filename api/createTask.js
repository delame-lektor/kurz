const axios = require('axios');

module.exports = async (req, res) => {
  const { FRELO_EMAIL, FRELO_API_KEY } = process.env;
  const { projectId, tasklistId, title, note } = req.body;

  if (!projectId || !tasklistId || !title) {
    return res.status(400).json({
      error: 'Missing required fields: projectId, tasklistId, or title',
    });
  }

  try {
    const response = await axios.post(
      `https://api.freelo.io/v1/tasks`,
      {
        projectId,
        tasklistId,
        title,
        note: note || '',
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

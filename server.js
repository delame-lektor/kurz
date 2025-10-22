const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// ✅ Your Freelo credentials (store in environment variables)
const FRELO_EMAIL = process.env.FREELO_EMAIL;
const FRELO_API_KEY = process.env.FREELO_API_KEY;
const USER_AGENT = 'GPT-Freelo-Proxy (you@example.com)';

// ✅ Base Freelo API URL
const API_BASE = 'https://api.freelo.io/v1';

// Proxy: GET /projects
app.get('/projects', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE}/projects`, {
      auth: { username: FRELO_EMAIL, password: FRELO_API_KEY },
      headers: { 'User-Agent': USER_AGENT }
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: 'Proxy error' });
  }
});

// Proxy: GET /project/tasklists?projectId=123
app.get('/project/tasklists', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE}/project/tasklists`, {
      params: req.query,
      auth: { username: FRELO_EMAIL, password: FRELO_API_KEY },
      headers: { 'User-Agent': USER_AGENT }
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: 'Proxy error' });
  }
});

// Add more routes here (e.g. /project/tasks, /project/task, etc.)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Freelo Proxy running on port ${port}`);
});

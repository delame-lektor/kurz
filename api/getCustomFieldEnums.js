const axios = require('axios');

module.exports = async (req, res) => {
  const FRELO_EMAIL = process.env.FRELO_EMAIL;
  const FRELO_API_KEY = process.env.FRELO_API_KEY;

  try {
    const response = await axios.get(`https://api.freelo.io/v1/custom-field-enum/get-for-custom-field/{custom_field_uuid}`, {
      auth: { username: FRELO_EMAIL, password: FRELO_API_KEY },
      headers: { 'User-Agent': 'FreeloGPTProxy (proxy@vercel.app)' }
    });
    res.status(200).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message, details: err.response?.data || null });
  }
};
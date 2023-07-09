const express = require('express');
const axios = require('axios');
const cors = require('cors');


const app = express();
const PORT = 3001;
app.use(cors());

app.get('/currency-rates', async (req, res) => {
  try {
    const response = await axios.get('http://api.nbp.pl/api/exchangerates/tables/A/');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/last-currency-rates/:currency', async (req, res) => {
  try {
    const { currency } = req.params;
    const response = await axios.get(`http://api.nbp.pl/api/exchangerates/rates/A/${currency}/last/30/`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/last-gold-rates', async (req, res) => {
  try {
    const response = await axios.get(`http://api.nbp.pl/api/cenyzlota/last/30`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

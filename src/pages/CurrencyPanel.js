import React, { useState } from 'react';
import { Box, Typography, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import axios from 'axios';

export default function CurrencyPanel() {
  const [currency, setCurrency] = useState('Currency');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

const fetchCurrencyRates = async () => {
  try {
    const response = await axios.get('http://api.nbp.pl/api/exchangerates/tables/A/');
    const data = response.data;
    console.log(data); // Tutaj można wykonać odpowiednie operacje na danych
  } catch (error) {
    console.error(error);
  }
};

fetchCurrencyRates();

  return (
    <Box maxWidth="800px" marginLeft="20px" marginTop="50px" bgcolor="#0e0b16" color="#e7dfdd">
      <Typography>{currency}</Typography>
      <Box maxWidth="100px" sx={{marginTop:"25px"}}>
        <FormControl fullWidth>
          <InputLabel id="currency-select-label" style={{ color: "#e7dfdd" }}>Currency</InputLabel>
          <Select
            labelId="currency-select-label"
            id="currency-select"
            value={currency}
            label="Currency"
            onChange={handleChange}
            style={{ backgroundColor: "#a239ca", color: "#e7dfdd"}}
          >
            <MenuItem value="USD" style={{ color: "#0e0b16" }}>USD</MenuItem>
            <MenuItem value="EUR" style={{ color: "#0e0b16" }}>EUR</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

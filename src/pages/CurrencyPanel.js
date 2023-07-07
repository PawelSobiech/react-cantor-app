import React, { useState } from 'react';
import { Box, InputLabel, MenuItem, FormControl, Select, TextField, Button, TableCell, TableBody, TableRow, Table, TableHead, TableContainer, Typography } from '@mui/material';
import axios from 'axios';

export default function CurrencyPanel() {
  const [currency, setCurrency] = useState('USD');
  const [savedData, setSavedData] = useState([]);
  const [effectiveDate, setEffectiveDate] = useState();

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const fetchCurrencyRates = async (currency) => {
    try {
      const response = await axios.get('http://localhost:3001/currency-rates');
      const data = response.data;
      setEffectiveDate(data[0].effectiveDate);
      const filteredData = data.flatMap((item) => item.rates).filter((item) => item.code === currency)
      setSavedData(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCurrency = async () => {
    try {
      const response = await axios.get('http://localhost:3001/currency-rates');
      const data = response.data;
      setEffectiveDate(data[0].effectiveDate);
      const filteredData = data.flatMap((item) => item.rates);
      setSavedData(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box maxWidth="800px" marginLeft="20px" marginTop="50px" color="#e7dfdd">
      <Typography variant="h4">Choose currency you want to look for</Typography>
      <Typography fontWeight={400}>Each rate refers to PLN according to current NBP data</Typography>
      <Box maxWidth="100px" sx={{marginTop:"25px"}}>
        <FormControl fullWidth>
          <InputLabel id="currency-select-label" style={{ color: "#e7dfdd" }}>Currency</InputLabel>
          <Select
            labelId="currency-select-label"
            id="currency-select"
            value={currency}
            label="Currency"
            onChange={handleChange}
            style={{ backgroundColor: "#4717f6", color: "#e7dfdd"}}
          >
            <MenuItem value="USD" style={{ color: "#0e0b16" }}>USD</MenuItem>
            <MenuItem value="EUR" style={{ color: "#0e0b16" }}>EUR</MenuItem>
          </Select>
        </FormControl>
      
      <Button fullWidth sx={{
        backgroundColor: "#a239ca", 
        color: "#e7dfdd",
        marginTop: "10px",
        marginRight: "10px"
        
      }}
      onClick={() => fetchCurrencyRates(currency)}>Get data
      </Button>
      </Box>
      <Button sx={{
        backgroundColor: "#a239ca", 
        color: "#e7dfdd",
        marginTop: "10px",
        }}
      onClick={fetchCurrency}>Get all currencies data
      </Button>
      <TableContainer sx={{ maxWidth: '1500px' }} style={{ height: '90%', backgroundColor: '#4717f6', marginTop: '20px'}}>
        <Box sx={{ overflow: 'auto' }}>
          <Table sx={{ border: '1px solid #ccc' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ border: '1px solid #ccc', fontSize: '16px', fontWeight: 'bold', color: '#e7dfdd' }}>Currency</TableCell>
                <TableCell sx={{ border: '1px solid #ccc', fontSize: '16px', fontWeight: 'bold', color: '#e7dfdd' }}>Currency Rate</TableCell>
                <TableCell sx={{ border: '1px solid #ccc', fontSize: '16px', fontWeight: 'bold', color: '#e7dfdd' }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {savedData.map((data) =>
                <TableRow key={data.code} sx={{color: '#e7dfdd'}}>
                  <TableCell sx={{ border: '1px solid #ccc', color: '#e7dfdd' }}>{data.currency}</TableCell>
                  <TableCell sx={{ border: '1px solid #ccc', color: '#e7dfdd' }}>{data.mid}</TableCell>
                  <TableCell sx={{ border: '1px solid #ccc', color: '#e7dfdd'  }}>{effectiveDate}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
    </Box>
  );
}

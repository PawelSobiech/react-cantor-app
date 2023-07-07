import React, { useState } from 'react';
import { Stack, Box, InputLabel, MenuItem, FormControl, Select, Button, TableCell, TableBody, TableRow, Table, TableHead, TableContainer, Typography } from '@mui/material';
import axios from 'axios';

export default function CurrencyPanel() {
  const [currency, setCurrency] = useState('USD');
  const [savedData, setSavedData] = useState([]);
  const [effectiveDate, setEffectiveDate] = useState();
  const [sortOrder, setSortOrder] = useState('null');

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const fetchCurrencyRates = async (currency) => {
    try {
      const response = await axios.get('http://localhost:3001/currency-rates');
      const data = response.data;
      setEffectiveDate(data[0].effectiveDate);
      const filteredData = data.flatMap((item) => item.rates).filter((item) => item.code === currency);
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
      let filteredData = data.flatMap((item) => item.rates);

      if (sortOrder === 'asc') {
        filteredData.sort((a, b) => a.mid - b.mid);
      } else if (sortOrder === 'desc') {
        filteredData.sort((a, b) => b.mid - a.mid);
      }

      setSavedData(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box maxWidth="800px" marginLeft="20px" marginTop="50px" color="#e7dfdd">
      <Typography color="#a239ca" variant="h4">Choose currency you want to look for!</Typography>
      <Typography fontWeight={400}>Each rate refers to PLN according to current NBP data</Typography>
      <Stack direction="row" maxWidth="300px" sx={{marginTop:"25px"}}>
        <FormControl fullWidth>
          <InputLabel id="currency-select-label" style={{ color: "#e7dfdd" }}>Currency</InputLabel>
          <Select
            labelId="currency-select-label"
            id="currency-select"
            value={currency}
            label="Currency"
            onChange={handleCurrencyChange}
            style={{ backgroundColor: "#4717f6", color: "#e7dfdd", marginRight:"10px"}}
          >
            <MenuItem value="USD" style={{ color: "#0e0b16" }}>USD</MenuItem>
            <MenuItem value="EUR" style={{ color: "#0e0b16" }}>EUR</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="sort-select-label" style={{ color: "#e7dfdd" }}>Sort order</InputLabel>
          <Select
            labelId="sort-select-label"
            id="sort-select"
            value={sortOrder}
            label="Sort order"
            onChange={handleSortOrderChange}
            style={{ backgroundColor: "#4717f6", color: "#e7dfdd"}}
          >
            <MenuItem value="null" style={{ color: "#0e0b16" }}>No sorting</MenuItem>
            <MenuItem value="asc" style={{ color: "#0e0b16" }}>Ascending</MenuItem>
            <MenuItem value="desc" style={{ color: "#0e0b16" }}>Descending</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Stack direction="row" maxWidth="300px" maxHeight="50px" sx={{marginTop:"25px"}}>
        <Button
          sx={{
            backgroundColor: "#a239ca", 
            color: "#e7dfdd",
            marginRight: "10px"
          }}
          onClick={() => fetchCurrencyRates(currency)}
        >
          Get data
        </Button>
        <Button
          sx={{
            backgroundColor: "#a239ca", 
            color: "#e7dfdd"
          }}
          onClick={fetchCurrency}
        >
          Get all currencies data
        </Button>
      </Stack>
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
              {savedData.map((data) => (
                <TableRow key={data.code} sx={{color: '#e7dfdd'}}>
                  <TableCell sx={{ border: '1px solid #ccc', color: '#e7dfdd' }}>{data.currency}</TableCell>
                  <TableCell sx={{ border: '1px solid #ccc', color: '#e7dfdd' }}>{data.mid}</TableCell>
                  <TableCell sx={{ border: '1px solid #ccc', color: '#e7dfdd' }}>{effectiveDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
    </Box>
  );
}

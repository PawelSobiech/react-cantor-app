import React, { useState } from 'react';
import { Box, InputLabel, MenuItem, FormControl, Select, TextField, Button, TableCell, TableBody, TableRow, Table, TableHead, TableContainer } from '@mui/material';
import axios from 'axios';

export default function CurrencyPanel() {
  const [currency, setCurrency] = useState('USD');
  const [savedData, setSavedData] = useState([]);

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

const fetchCurrencyRates = async (currency) => {
  try {
    const response = await axios.get('http://api.nbp.pl/api/exchangerates/tables/A/');
    const filteredData = response.data.filter((data) => data.currency === currency);
    console.log(filteredData)
    console.log("chuj")
    setSavedData(filteredData)
  } catch (error) {
    console.error(error);
  }
};

fetchCurrencyRates(currency);

  return (
    <Box maxWidth="800px" marginLeft="20px" marginTop="50px" color="#e7dfdd">
      {/* <TextField id="filled-basic" label="Enter " variant="filled" sx={{
        backgroundColor:"#a239ca", 
        color: "#e7dfdd",
        marginRight:"20px"
        }}/>
      <TextField id="filled-basic" label="Filled" variant="filled" sx={{
        backgroundColor:"#a239ca", 
        color: "#e7dfdd",
        marginRight:"20px"
        }}/>
      <TextField id="filled-basic" label="Filled" variant="filled" sx={{
        backgroundColor:"#a239ca", 
        color: "#e7dfdd",
        marginRight:"20px"
        }}/> */}
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
          <Button sx={{
            backgroundColor: "#a239ca", 
            color: "#e7dfdd",
            marginTop: "10px"
          }}
          onClick={fetchCurrencyRates}>Get data</Button>
        </FormControl>
      </Box>
      <TableContainer sx={{ maxWidth: '1500px' }} style={{ height: '90%', backgroundColor: '#4717f6', marginTop: '20px'}}>
        <Box sx={{ overflow: 'auto' }}>
          <Table sx={{ border: '1px solid #ccc' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ border: '1px solid #ccc', fontSize: '16px', fontWeight: 'bold', color: '#e7dfdd' }}>Currency</TableCell>
                <TableCell sx={{ border: '1px solid #ccc', fontSize: '16px', fontWeight: 'bold', color: '#e7dfdd' }}>Currency Rate</TableCell>
                <TableCell sx={{ border: '1px solid #ccc', fontSize: '16px', fontWeight: 'bold', color: '#e7dfdd' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {savedData.map((data) => (
                <TableRow>
                  <TableCell sx={{ border: '1px solid #ccc' }}>{data.name}</TableCell>
                  <TableCell sx={{ border: '1px solid #ccc' }}>{data.rate}</TableCell>
                  <TableCell sx={{ border: '1px solid #ccc' }}>
                    <Button
                      variant="outlined"
                      className="add-btn"
                      sx={{
                        bgcolor: '#FF2625',
                        color: '#fff',
                        textTransform: 'none',
                        minWidth: '80px',
                        height: '40px',
                        fontSize: { lg: '16px', xs: '12px' },
                        marginBottom: '10px',
                        marginRight: '10px',
                      }}
                      //onClick={() => deleteExercise(data._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outlined"
                      className="add-btn"
                      sx={{
                        bgcolor: '#2ECC71',
                        color: '#fff',
                        textTransform: 'none',
                        minWidth: '80px',
                        height: '40px',
                        fontSize: { lg: '16px', xs: '12px' },
                        marginBottom: '10px',
                      }}
                      //onClick={() => handleEdit(data)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
    </Box>
  );
}

import React, { useState } from 'react';
import { Grid, Stack, Box, InputLabel, MenuItem, FormControl, Select, Button, TableCell, TableBody, TableRow, Table, TableHead, TableContainer, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import axios from 'axios';

export default function CurrencyPanel() {
  const [currency, setCurrency] = useState('USD');
  const [tempCurrency, setTempCurrency] = useState('USD');
  const [savedData, setSavedData] = useState([]);
  const [effectiveDate, setEffectiveDate] = useState();
  const [sortOrder, setSortOrder] = useState('null');
  const [plotData, setPlotData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showTable1, setShowTable1] = useState(false);
  const [showPlot, setShowPlot] = useState(false);
  let [minMaxValues, setMinMaxValues] = useState({
    min: { rate: 0, date: "" },
    max: { rate: 0, date: "" },
  });
  
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
      setShowTable(false);
      setShowTable1(true);
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
      setShowTable(true);
      setSavedData(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  const sortCurrencies = () => {  
    let filteredData = [...savedData];
  
    if (sortOrder === 'asc') {
      filteredData.sort((a, b) => a.mid - b.mid);
    } else if (sortOrder === 'desc') {
      filteredData.sort((a, b) => b.mid - a.mid);
    }
    else{
      if(showTable){
        fetchCurrency()
      }
    }
    setSavedData(filteredData);
  };

  const generatePlot = () => {
    axios.get(`http://localhost:3001/last-currency-rates/${currency}`)
      .then((response) => {
        const data = response.data.rates.flatMap((rate) => ({
          date: rate.effectiveDate,
          rate: rate.mid,
        }));
        setTempCurrency(currency);
        setShowPlot(true);
        setPlotData(data);
        computeValues(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const computeValues = (data) => {
    if (data.length > 0) {
      const result = data.reduce(
        (result, current) => {
          if (current.rate < result.min.rate) {
            result.min = current;
          }
          if (current.rate > result.max.rate) {
            result.max = current;
          }
          return result;
        },
        { min: data[0], max: data[0] }
      );
  
      setMinMaxValues(result);
    }
  };

  const clearView = () => {  
    setSavedData();
    setShowPlot(false);
    setShowTable(false);
    setShowTable1(false);
    setSortOrder('null');
    setPlotData();
    setEffectiveDate();
    setMinMaxValues({
      min: { rate: 0, date: "" },
      max: { rate: 0, date: "" },
    });
  };

  return (
    <Box marginLeft="20px">
      <Grid container maxWidth="1600px" color="#e7dfdd" spacing={2} marginTop="50px">
        <Grid item xs={12} md={6}>
          <Box>
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
              { showTable && (
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
                    <MenuItem value="asc" style={{ color: "#0e0b16" }}>Ascending by rate</MenuItem>
                    <MenuItem value="desc" style={{ color: "#0e0b16" }}>Descending by rate</MenuItem>
                  </Select>
                </FormControl>
              )}
            </Stack>
            <Stack direction="row" maxWidth="700px" maxHeight="50px" sx={{marginTop:"25px"}}>
              <Button
                sx={{
                  backgroundColor: "#a239ca", 
                  color: "#e7dfdd",
                  marginRight: "10px"
                }}
                onClick={() => fetchCurrencyRates(currency)}
              >
                Get currency
              </Button>
              <Button
                sx={{
                  backgroundColor: "#a239ca", 
                  color: "#e7dfdd",
                  marginRight: "10px" 
                }}
                onClick={fetchCurrency}
              >
                Get all currencies
              </Button>
              { showTable && (
              <Button
                sx={{
                  backgroundColor: "#a239ca", 
                  color: "#e7dfdd",
                  marginRight: "10px" 
                }}
                onClick={sortCurrencies}
              >
                Sort currencies
              </Button>
              )}
              <Button
                sx={{
                  backgroundColor: "#a239ca", 
                  color: "#e7dfdd",
                  marginRight: "10px" 
                }}
                onClick={generatePlot}
              >
                Generate plot
              </Button>
              { ( showTable || showTable1 || showPlot ) && (
              <Button
                sx={{
                  backgroundColor: "#a239ca", 
                  color: "#e7dfdd"
                }}
                onClick={clearView}
              >
                Clear view
              </Button>
              )}
            </Stack>
          </Box>
          { (showTable || showTable1) && (
            <>
              <TableContainer sx={{ maxWidth: '700px', flex: 1}} style={{ backgroundColor: '#4717f6', marginTop: '20px', marginBottom:"100px"}}>
                <Box sx={{ overflow: 'auto', height: '100%' }}>
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
            </>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          {showPlot && (
            <>
              <Typography color="#a239ca" variant="h4">Last 30 {tempCurrency} rates</Typography>
              <ResponsiveContainer width="100%" height={450}>
              <LineChart
                data={plotData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e7dfdd" />
                <XAxis dataKey="date" stroke="#e7dfdd" />
                <YAxis stroke="#e7dfdd" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#4717f6", color: "#e7dfdd" }}
                  labelStyle={{ color: "#e7dfdd" }}
                  itemStyle={{ color: "#e7dfdd" }}
                />
                <Legend
                  wrapperStyle={{ color: "#e7dfdd" }}
                />
                <Line type="monotone" dataKey="rate" stroke="#e7dfdd" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
            <TableContainer sx={{ maxWidth: '700px', flex: 1}} style={{ backgroundColor: '#4717f6', marginTop: '20px', marginBottom:"100px", marginLeft:"70px"}}>
                <Box sx={{ overflow: 'auto', height: '100%' }}>
                  <Table sx={{ border: '1px solid #ccc' }}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ border: '1px solid #ccc', fontSize: '16px', fontWeight: 'bold', color: '#e7dfdd' }}>Minimal Rate</TableCell>
                        <TableCell sx={{ border: '1px solid #ccc', fontSize: '16px', fontWeight: 'bold', color: '#e7dfdd' }}>Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow sx={{color: '#e7dfdd'}}>
                          <TableCell sx={{ border: '1px solid #ccc', color: '#e7dfdd' }}>{minMaxValues.min.rate}</TableCell>
                          <TableCell sx={{ border: '1px solid #ccc', color: '#e7dfdd' }}>{minMaxValues.min.date}</TableCell>
                        </TableRow>
                        <TableRow sx={{color: '#e7dfdd'}}>
                          <TableCell sx={{ border: '1px solid #ccc', fontSize: '16px', fontWeight: 'bold', color: '#e7dfdd' }}>Maximal Rate</TableCell>
                          <TableCell sx={{ border: '1px solid #ccc', fontSize: '16px', fontWeight: 'bold', color: '#e7dfdd' }}>Date</TableCell>
                        </TableRow>
                        <TableRow sx={{color: '#e7dfdd'}}>
                          <TableCell sx={{ border: '1px solid #ccc', color: '#e7dfdd' }}>{minMaxValues.max.rate}</TableCell>
                          <TableCell sx={{ border: '1px solid #ccc', color: '#e7dfdd' }}>{minMaxValues.max.date}</TableCell>
                        </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </TableContainer>
          </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

import React, { useState } from 'react';
import { Grid, Stack, Box, InputLabel, MenuItem, FormControl, Select, Button, TableCell, TableBody, TableRow, Table, TableHead, TableContainer, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import axios from 'axios';

export default function GoldPanel() {
  const [savedData, setSavedData] = useState([]);
  const [sortOrder, setSortOrder] = useState('null');
  const [plotData, setPlotData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showPlot, setShowPlot] = useState(false);

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const fetchGoldRates = async () => {
    try {
      const response = await axios.get('http://localhost:3001/last-gold-rates');
      const data = response.data;
      setSavedData(data);
      console.log("data");
      console.log(data);
      setPlotData(data);
      setShowTable(true);
    } catch (error) {
      console.error(error);
    }
  };

  const sortData = () => {  
    let filteredData = [...savedData];
  
    if (sortOrder === 'asc') {
      filteredData.sort((a, b) => a.cena - b.cena);
    } else if (sortOrder === 'desc') {
      filteredData.sort((a, b) => b.cena - a.cena);
    }
    else{
      if(showTable){
        fetchGoldRates()
      }
    }
    setSavedData(filteredData);
  };

  const generatePlot = async () => {
    try {
      const response = await axios.get('http://localhost:3001/last-gold-rates');
      const data = response.data;
      setShowPlot(true);
      setPlotData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const clearView = () => {  
    setSavedData([]);
    setShowPlot(false);
    setShowTable(false);
    setSortOrder('null');
    setPlotData([]);
  };

  return (
    <Box marginLeft="20px" marginRight="20px">
    <Grid container color="#e7dfdd" spacing={2} marginTop="50px">
      <Grid item xs={12} md={6}>
        <Box>
          <Typography color="#a239ca" variant="h4">All gold data you want to look for!</Typography>
          <Typography fontWeight={400}>Rate refers to PLN according to current NBP data</Typography>
          <Stack direction="row" maxWidth="300px" sx={{marginTop:"25px"}}>
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
                <MenuItem value="null" style={{ color: "#0e0b16" }}>Ascending by date</MenuItem>
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
              onClick={fetchGoldRates}
            >
              Get gold data
            </Button>
            { showTable && (
            <Button
              sx={{
                backgroundColor: "#a239ca", 
                color: "#e7dfdd",
                marginRight: "10px" 
              }}
              onClick={sortData}
            >
              Sort data
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
            { (showPlot || showTable) && (
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
        {showTable && (
          <>
            <TableContainer sx={{ maxWidth: '700px', flex: 1 }} style={{ backgroundColor: '#4717f6', marginTop: '20px', marginBottom:"100px"}}>
              <Box sx={{ overflow: 'auto', height: '100%' }}>
                <Table sx={{ border: '1px solid #ccc' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ border: '1px solid #ccc', fontSize: '16px', fontWeight: 'bold', color: '#e7dfdd' }}>Gold rate</TableCell>
                      <TableCell sx={{ border: '1px solid #ccc', fontSize: '16px', fontWeight: 'bold', color: '#e7dfdd' }}>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {savedData.map((dane) => (
                      <TableRow key={dane.data} sx={{color: '#e7dfdd'}}>
                        <TableCell sx={{ border: '1px solid #ccc', color: '#e7dfdd' }}>{dane.cena}</TableCell>
                        <TableCell sx={{ border: '1px solid #ccc', color: '#e7dfdd' }}>{dane.data}</TableCell>
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
            <Typography color="#a239ca" variant="h4">Last 30 gold rates</Typography>
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
              <XAxis dataKey="data" stroke="#e7dfdd" />
              <YAxis domain={[100, 400]} stroke="#e7dfdd" />
              <Tooltip
                contentStyle={{ backgroundColor: "#4717f6", color: "#e7dfdd" }}
                labelStyle={{ color: "#e7dfdd" }}
                itemStyle={{ color: "#e7dfdd" }}
              />
              <Legend
                wrapperStyle={{ color: "#e7dfdd" }}
              />
              <Line type="monotone" dataKey="cena" stroke="#e7dfdd" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </>
        )}
      </Grid>
    </Grid>
    </Box>
  );
}

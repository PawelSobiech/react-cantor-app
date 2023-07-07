import React from 'react'
import { Box, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box maxWidth="800px" marginLeft="20px" marginTop="50px" color="#e7dfdd">
      <Typography color="#a239ca" variant="h4">Welcome in our Cantor!</Typography>
      <Typography fontWeight="400">
        TNBM Cantor is an interactive platform that allows users to track currency rates. 
        With the Currency Panel, users can select the currency they are interested in, sort rates, 
        download data on other currencies, and generate charts and tables with current rates.
      </Typography>
    </Box>
  )
}

export default Home
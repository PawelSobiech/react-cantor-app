import React from 'react'
import { Box, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box maxWidth="800px" marginLeft="20px" marginTop="70px" color="#e7dfdd">
      <Typography color="#a239ca" variant="h4">Welcome in our Cantor!</Typography>
      <Typography fontWeight="400">
        TNBM Cantor is an interactive platform that allows users to track currency and gold rates.
        <br/>
        With the Currencies Panel, users can select the currency they are interested in, sort rates, 
        download data on some other currencies, and generate charts and tables with current rates.
        <br/>
        The Gold Panel provides users with the ability to explore gold rates. 
        Users can fetch the latest gold data, sort rates, generate plots, and view data in the table. 
      </Typography>
    </Box>
  )
}

export default Home
import React from 'react';
import './App.css'

import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import Home from './pages/Home';
import CurrencyPanel from './pages/CurrencyPanel';
import GoldPanel from './pages/GoldPanel';

import Navbar from './components/Navbar'
import Footer from './components/Footer'

// void - #0e0b16
// fuchsia - #a239ca
// jewel - #4717f6
// stark - #e7dfdd


function App() {
  return (
    <Box>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/currency-panel" element={<CurrencyPanel/>}/>
        <Route path="/gold-panel" element={<GoldPanel/>}/>
      </Routes>
      <Footer/>
    </Box>
  );
}

export default App;

import React from 'react'
import { Stack } from '@mui/material'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <Stack 
      direction="row"
      backgroundColor="#0e0b16"
      justifyContent="space-around"
      borderBottom="solid 3px #e7dfdd"
      sx = {{
        gap: {sm: '122px', xs: '44px'},
        marginTop: '20px',
        marginBottom: '20px',
        padding: '20px'
      }}>
        <Stack
          direction="row"
          gap="40px" 
          fontSize="24px" 
          alignItems="center"
        >
          <Link 
            to="/"
            style={{
              textDecoration: 'none',
              color: '#e7dfdd',
              fontWeight: 'bold'
            }}>Home</Link>
          <Link 
            to="/currency-panel"
            style={{
              textDecoration: 'none',
              color: '#e7dfdd',
              fontWeight: 'bold'
          }}>Currency Panel</Link>
          <Link 
            to="/gold-panel"
            style={{
              textDecoration: 'none',
              color: '#e7dfdd',
              fontWeight: 'bold'
          }}>Gold Panel</Link>
        </Stack>
    </Stack>
  )
}

export default Navbar
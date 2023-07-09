import React from 'react'
import { Stack } from '@mui/material'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <Stack 
      direction="row"
      backgroundColor="#0e0b16"
      justifyContent="space-between"
      alignItems="center"
      borderBottom="solid 3px #e7dfdd"
      sx={{
        marginTop: '20px',
        marginBottom: '20px',
        padding: '20px'
      }}
    >
      <img src="/logo.png" alt="Logo" style={{ height: '45px', width: 'auto', marginLeft: '20px' }} />
      <Stack
        direction="row"
        gap="40px"
        fontSize="24px"
        alignItems="center"
        flexGrow={1}
        justifyContent="center"
      >
        <Link 
          to="/"
          style={{
            textDecoration: 'none',
            color: '#e7dfdd',
            fontWeight: 'bold'
          }}
        >
          Home
        </Link>
        <Link 
          to="/currency-panel"
          style={{
            textDecoration: 'none',
            color: '#e7dfdd',
            fontWeight: 'bold'
          }}
        >
          Currencies
        </Link>
        <Link 
          to="/gold-panel"
          style={{
            textDecoration: 'none',
            color: '#e7dfdd',
            fontWeight: 'bold'
          }}
        >
          Gold
        </Link>
      </Stack>
    </Stack>
  )
}

export default Navbar

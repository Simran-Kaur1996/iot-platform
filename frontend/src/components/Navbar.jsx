import React from 'react'
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Typography,
  Box,
  Button
} from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import SensorsIcon from '@mui/icons-material/Sensors'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isLoggedIn = !!localStorage.getItem('token')

  // ✅ Use correct paths that match App.jsx
  const tabRoutes = isLoggedIn
    ? ['/', '/add', '/delete']
    : ['/login', '/signup'] // assuming you'll add signup later

  const currentTab = tabRoutes.indexOf(location.pathname)

  return (
    <AppBar position="static" sx={{ backgroundColor: '#0A1929' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* 🔷 Logo + Title */}
        <Box
          display="flex"
          alignItems="center"
          onClick={() => navigate('/')}
          sx={{ cursor: 'pointer' }}
        >
          <SensorsIcon sx={{ mr: 1, color: 'cyan.500' }} />
          <Typography variant="h6" color="inherit">
            IoT Monitor
          </Typography>
        </Box>

        {/* 🔹 Navigation Tabs */}
        <Tabs
          value={currentTab === -1 ? false : currentTab}
          onChange={(e, newValue) => navigate(tabRoutes[newValue])}
          textColor="inherit"
          indicatorColor="secondary"
        >
          {isLoggedIn && <Tab label="Dashboard" />}
          {isLoggedIn && <Tab label="Add Sensor" />}
          {isLoggedIn && <Tab label="Delete Sensor" />}
          {!isLoggedIn && <Tab label="Login" />}
          {!isLoggedIn && <Tab label="Signup" />}
        </Tabs>

        {/* 🔐 Logout Button */}
        {isLoggedIn && (
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => {
              localStorage.removeItem('token')
              navigate('/login')
            }}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar

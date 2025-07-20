import React, { useState } from 'react'
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box
} from '@mui/material'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../aws/cognito'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = await loginUser(email, password)
      localStorage.setItem('token', token)
      navigate('/')
    } catch (err) {
      console.error('Login error:', err)
      alert('Login failed. Please check your credentials.')
    }
  }
  return (
    <Container maxWidth="xs">
      <Paper elevation={4} sx={{ padding: 4, mt: 8, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <LockOpenIcon color="primary" />
          <Typography variant="h5">IoT Login</Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Password"
            fullWidth
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
          <Button fullWidth sx={{ mt: 1 }} onClick={() => navigate('/signup')}>
            Don’t have an account? Sign Up
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

export default Login

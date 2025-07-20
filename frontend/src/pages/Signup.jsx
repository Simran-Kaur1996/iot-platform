import React, { useState } from 'react'
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box
} from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { useNavigate } from 'react-router-dom'
import { signUpUser } from '../aws/cognito' // ✅ Cognito helper

const Signup = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      await signUpUser(email, password) // ✅ Call Cognito signup
      alert('Signup successful! Please check your email to confirm.')
      navigate('/login')
    } catch (error) {
      alert(error.message || 'Signup failed. Try again.')
    }
  }

  return (
    <Container maxWidth="xs">
      <Paper elevation={4} sx={{ padding: 4, mt: 8, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <PersonAddIcon color="primary" />
          <Typography variant="h5">Create an Account</Typography>
        </Box>
        <form onSubmit={handleSignup}>
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
            Sign Up
          </Button>
          <Button fullWidth sx={{ mt: 1 }} onClick={() => navigate('/login')}>
            Already have an account? Log In
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

export default Signup

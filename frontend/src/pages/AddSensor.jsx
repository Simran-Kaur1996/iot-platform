import React, { useState } from 'react'
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axiosInstance'
import { pushNotification } from '../features/sensors/notificationSlice' // ✅ Corrected import path

const AddSensor = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [sensor_id, setSensorId] = useState('')
  const [sensor_type, setSensorType] = useState('')
  const [location, setLocation] = useState('')

  const handleAddSensor = async (e) => {
    e.preventDefault() // ✅ Prevent default form submission
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        dispatch(
          pushNotification({
            type: 'error',
            message: '❌ Unauthorized: No token found'
          })
        )
        return
      }

      const res = await axios.post(
        '/sensors',
        { sensor_id, sensor_type, location },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      dispatch(
        pushNotification({
          type: 'success',
          message: `✅ Sensor "${sensor_id}" added successfully!`
        })
      )

      setSensorId('')
      setSensorType('')
      setLocation('')
      navigate('/')
    } catch (err) {
      dispatch(
        pushNotification({
          type: 'error',
          message:
            '❌ Failed to add sensor. ' +
            (err.response?.data?.error || 'Unknown error')
        })
      )
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Add New Sensor
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleAddSensor} // ✅ Added submit handler
        >
          <TextField
            label="Sensor ID"
            fullWidth
            margin="normal"
            value={sensor_id}
            onChange={(e) => setSensorId(e.target.value)}
            required
          />
          <TextField
            label="Sensor Type"
            fullWidth
            margin="normal"
            value={sensor_type}
            onChange={(e) => setSensorType(e.target.value)}
            required
          />
          <TextField
            label="Location"
            fullWidth
            margin="normal"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            type="submit" // ✅ Correctly submitting form
          >
            Add Sensor
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default AddSensor

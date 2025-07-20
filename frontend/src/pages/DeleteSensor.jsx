import React, { useEffect, useState } from 'react'
import {
  Container,
  Typography,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Paper
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSensors } from '../features/sensors/sensorThunks'
import axios from '../api/axiosInstance'
import { pushNotification } from '../features/sensors/notificationSlice' // ✅ Add this

const DeleteSensor = () => {
  const dispatch = useDispatch()
  const sensors = useSelector((state) => state.sensors.list)
  const [selected, setSelected] = useState('')

  useEffect(() => {
    dispatch(fetchSensors())
  }, [dispatch])

  const handleDelete = async (sensor_id) => {
    try {
      const res = await axios.delete(`/sensors/${sensor_id}`)
      console.log('✅ Deleted:', res.data)

      dispatch(
        pushNotification({
          type: 'success',
          message: `🗑️ Sensor "${sensor_id}" deleted successfully!`
        })
      )

      dispatch(fetchSensors())
      setSelected('')
    } catch (err) {
      console.error(
        '❌ Frontend delete failed:',
        err.response?.data || err.message
      )
      dispatch(
        pushNotification({
          type: 'error',
          message:
            '❌ Failed to delete sensor: ' +
            (err.response?.data?.error || 'Unknown error')
        })
      )
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Delete Sensor
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>Select Sensor</InputLabel>
          <Select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            label="Select Sensor"
          >
            {sensors.map((sensor) => (
              <MenuItem key={sensor.sensor_id} value={sensor.sensor_id}>
                {`${sensor.sensor_id} – ${sensor.location}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="error"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => handleDelete(selected)}
          disabled={!selected}
        >
          Delete Sensor
        </Button>
      </Paper>
    </Container>
  )
}

export default DeleteSensor

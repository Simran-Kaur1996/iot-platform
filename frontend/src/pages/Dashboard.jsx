import React, { useEffect, useState } from 'react'
import {
  Container,
  Grid,
  Typography,
  IconButton,
  Badge,
  Box
} from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSensors, fetchSensorData } from '../features/sensors/sensorThunks'
import { setSelectedId } from '../features/sensors/sensorSlice'

import SensorList from '../components/SensorList'
import SensorDetailsBox from '../components/SensorDetailsBox'
import SensorChart from '../components/SensorChart'
import SensorTable from '../components/SensorTable'
import AlertBanner from '../components/AlertBanner'
import Notificationpanel from '../components/Notificationpanel'

import AlertSnackbar from '../components/AlertSnackbar'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { list, selectedId, data } = useSelector((state) => state.sensors)

  const [notifOpen, setNotifOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [latestMessage, setLatestMessage] = useState('')

  // Trigger snackbar when temp > 70
  useEffect(() => {
    if (selectedId && data?.length > 0) {
      const hasCriticalTemp = data.some((d) => d.temperature > 70)

      if (hasCriticalTemp) {
        const message = `🔥 ${selectedId} temperature exceeded 70°C`
        setLatestMessage(message)
        setSnackbarOpen(true)
      }
    }
  }, [data, selectedId])

  useEffect(() => {
    dispatch(fetchSensors())
  }, [dispatch])

  useEffect(() => {
    if (selectedId) {
      dispatch(fetchSensorData(selectedId))
    }
  }, [selectedId, dispatch])

  const selectedSensor = list.find((s) => s.sensor_id === selectedId)
  const alert = data?.some((d) => d.temperature > 70)

  return (
    <Container sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">SensorFlow</Typography>
        <IconButton color="primary" onClick={() => setNotifOpen(true)}>
          <Badge color="error" variant="dot">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Box>

      {/* Temp alert banner */}
      <AlertBanner
        open={alert}
        message={`Sensor ${selectedId} exceeded temperature threshold!`}
        onClose={() => {}}
      />

      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} md={4}>
          <SensorList
            sensors={list}
            selectedId={selectedId}
            onSelect={(id) => dispatch(setSelectedId(id))}
          />
          <SensorDetailsBox sensor={selectedSensor} />
        </Grid>

        <Grid item xs={12} md={8}>
          <SensorChart data={data} />
          <SensorTable rows={data} />
        </Grid>
      </Grid>

      {/* Notification Drawer and Snackbar */}
      <Notificationpanel
        open={notifOpen}
        onClose={() => setNotifOpen(false)}
        sensorId={selectedId}
        data={data}
      />
      <AlertSnackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={latestMessage}
      />
    </Container>
  )
}

export default Dashboard

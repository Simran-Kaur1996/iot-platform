import React, { useEffect, useState } from 'react'
import {
  Drawer,
  Typography,
  List,
  ListItem,
  Divider,
  Box,
  Tabs,
  Tab
} from '@mui/material'
import { getAllAlerts, getAlertsBySensorId } from '../api/alertsApi'

const NotificationDrawer = ({ open, onClose, sensorId }) => {
  const [alerts, setAlerts] = useState([])
  const [tab, setTab] = useState(0)

  const loadAlerts = async () => {
    try {
      if (tab === 0) {
        const data = await getAllAlerts()
        setAlerts(data)
      } else if (tab === 1 && sensorId) {
        const data = await getAlertsBySensorId(sensorId)
        setAlerts(data)
      } else {
        setAlerts([])
      }
    } catch (err) {
      console.error('❌ Failed to load alerts:', err)
      setAlerts([])
    }
  }

  useEffect(() => {
    if (open) {
      loadAlerts()
    }
  }, [open, tab, sensorId])

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 370, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Notificationsssssss
        </Typography>

        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="All Alerts" />
          <Tab label={`Sensor Alerts${sensorId ? ` (${sensorId})` : ''}`} />
        </Tabs>

        <Box sx={{ mt: 2 }}>
          {alerts.length === 0 ? (
            <Typography>No alerts yet</Typography>
          ) : (
            <List>
              {alerts.map((alert, idx) => (
                <React.Fragment key={idx}>
                  <ListItem alignItems="flex-start">
                    <Box>
                      <Typography variant="subtitle2" color="error.main">
                        ⚠️ Sensor: {alert.sensor_id}
                      </Typography>
                      <Typography variant="body2">
                        Location: {alert.location}
                      </Typography>
                      <Typography variant="body2">
                        Temp: {alert.temperature}°C, Battery:{' '}
                        {alert.battery_level}%
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(alert.timestamp).toLocaleString()}
                      </Typography>
                    </Box>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          )}
        </Box>
      </Box>
    </Drawer>
  )
}

export default NotificationDrawer

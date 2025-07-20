import React, { useEffect, useState } from 'react'
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Divider
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const Notificationpanel = ({ open, onClose, sensorId, data }) => {
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    if (open && sensorId && Array.isArray(data)) {
      const sensorAlerts = data
        .filter((d) => d.sensor_id === sensorId && d.alert_triggered)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // ✅ Sort by latest
      setAlerts(sensorAlerts)
    }
  }, [open, sensorId, data])

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div style={{ width: 350, padding: 16 }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
          Alerts for
          <strong style={{ marginLeft: 6 }}>{sensorId}</strong>
          <IconButton onClick={onClose} sx={{ marginLeft: 'auto' }}>
            <CloseIcon />
          </IconButton>
        </Typography>
        <Divider sx={{ my: 1 }} />

        <List>
          {alerts.length === 0 ? (
            <ListItem>
              <ListItemText primary="No alerts yet for this sensor" />
            </ListItem>
          ) : (
            alerts.map((a, i) => (
              <ListItem key={i} alignItems="flex-start">
                <ListItemText
                  primary={
                    a.message ||
                    `⚠️ Temp: ${a.temperature}°C, Battery: ${a.battery_level}%`
                  }
                  secondary={`Location: ${a.location} • ${new Date(
                    a.timestamp
                  ).toLocaleString()}`}
                />
              </ListItem>
            ))
          )}
        </List>
      </div>
    </Drawer>
  )
}

export default Notificationpanel

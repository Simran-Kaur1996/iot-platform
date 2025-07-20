import React from 'react'
import {
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Avatar,
  ListItemAvatar
} from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'

const SensorList = ({ sensors, selectedId, onSelect }) => (
  <List subheader={<ListSubheader>Sensor List</ListSubheader>} dense>
    {sensors.map((sensor) => (
      <ListItemButton
        key={sensor.sensor_id}
        selected={sensor.sensor_id === selectedId} // ✅ Fixed selection logic
        onClick={() => onSelect(sensor.sensor_id)}
      >
        <ListItemAvatar>
          <Avatar>
            <CircleIcon
              color={sensor.status === 'offline' ? 'error' : 'success'}
            />
          </Avatar>
        </ListItemAvatar>

        <ListItemText
          primary={sensor.sensor_id}
          secondary={`${sensor.location || 'Unknown'} — ${
            sensor.sensor_type || 'N/A'
          }`} // ✅ Fixed field name
        />
      </ListItemButton>
    ))}
  </List>
)

export default SensorList

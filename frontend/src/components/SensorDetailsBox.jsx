import { Card, CardContent, Typography } from '@mui/material'

const SensorDetailsBox = ({ sensor }) => (
  <Card sx={{ mt: 2 }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Selected Sensor Details
      </Typography>

      {sensor ? (
        <>
          <Typography>
            <strong>Sensor ID:</strong> {sensor.sensor_id}
          </Typography>
          <Typography>
            <strong>Type:</strong> {sensor.sensor_type}
          </Typography>
          <Typography>
            <strong>Location:</strong> {sensor.location}
          </Typography>
          <Typography>
            <strong>Status:</strong> {sensor.status}
          </Typography>
        </>
      ) : (
        <Typography>No sensor selected</Typography>
      )}
    </CardContent>
  </Card>
)

export default SensorDetailsBox

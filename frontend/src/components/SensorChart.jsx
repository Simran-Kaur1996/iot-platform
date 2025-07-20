import React from 'react'
import { Line } from 'react-chartjs-2'
import { Box, Typography } from '@mui/material'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
)

const SensorChart = ({ data }) => {
  const chartData = {
    labels: data.map((d) => new Date(d.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: data.map((d) => d.temperature),
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.2)',
        tension: 0.3
      }
    ]
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Sensor Chart
      </Typography>
      <Line data={chartData} />
    </Box>
  )
}

export default SensorChart

import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Typography } from '@mui/material'

const SensorTable = ({ rows }) => {
  const columns = [
    { field: 'id', headerName: '#', width: 70 },
    { field: 'timestamp', headerName: 'Timestamp', width: 180 },
    { field: 'temperature', headerName: 'Temp (°C)', width: 120 },
    { field: 'humidity', headerName: 'Humidity (%)', width: 130 },
    { field: 'light', headerName: 'Light (lux)', width: 110 },
    { field: 'battery_level', headerName: 'Battery (%)', width: 120 },
    {
      field: 'alert_triggered',
      headerName: 'Alert',
      width: 90,
      renderCell: (params) => (params.value ? '⚠️' : '✔️')
    }
  ]

  const formattedRows = rows.map((row, index) => ({
    id: index + 1,
    ...row
  }))

  return (
    <Box sx={{ height: 400 }}>
      <Typography variant="h6" gutterBottom>
        Selected Sensor Details
      </Typography>
      <DataGrid
        rows={formattedRows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowClassName={(params) =>
          params.row.alert_triggered ? 'alert-row' : ''
        }
      />
      <style>{`.alert-row { background-color: #ffe0e0; }`}</style>
    </Box>
  )
}

export default SensorTable

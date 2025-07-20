import React from 'react'
import { Snackbar, Alert } from '@mui/material'

const AlertBanner = ({ open, message, onClose }) => (
  <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
    <Alert
      onClose={onClose}
      severity="warning"
      variant="filled"
      sx={{ width: '100%' }}
    >
      {message}
    </Alert>
  </Snackbar>
)

export default AlertBanner

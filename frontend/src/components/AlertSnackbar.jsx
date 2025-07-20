import React from 'react'
import { Snackbar, Alert } from '@mui/material'

const AlertSnackbar = ({ open, onClose, message }) => (
  <Snackbar
    open={open}
    autoHideDuration={5000}
    onClose={onClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
  >
    <Alert severity="warning" onClose={onClose} variant="filled">
      {message}
    </Alert>
  </Snackbar>
)

export default AlertSnackbar

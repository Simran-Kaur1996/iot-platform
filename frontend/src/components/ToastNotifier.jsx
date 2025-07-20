import React from 'react'
import { Snackbar, Alert } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { removeNotification } from '../features/sensors/notificationSlice'

const ToastNotifier = () => {
  const notifications = useSelector((state) => state.notifications)
  const dispatch = useDispatch()

  const latest = notifications[notifications.length - 1]

  return (
    <>
      {latest && (
        <Snackbar
          key={latest.id}
          open={true}
          autoHideDuration={3000}
          onClose={() => dispatch(removeNotification(latest.id))}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            severity={latest.type || 'info'}
            sx={{ width: '100%' }}
            onClose={() => dispatch(removeNotification(latest.id))}
          >
            {latest.message}
          </Alert>
        </Snackbar>
      )}
    </>
  )
}

export default ToastNotifier

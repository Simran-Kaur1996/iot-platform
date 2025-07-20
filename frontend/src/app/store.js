// src/app/store.js
import { configureStore } from '@reduxjs/toolkit'
import sensorReducer from '../features/sensors/sensorSlice'
import notificationReducer from '../features/sensors/notificationSlice'

export const store = configureStore({
  reducer: {
    sensors: sensorReducer,
    notifications: notificationReducer
  }
})

// src/features/sensors/sensorThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAllSensors, getSensorDataById } from '../../api/sensorApi'

export const fetchSensors = createAsyncThunk(
  'sensors/fetchSensors',
  async () => {
    return await getAllSensors()
  }
)

export const fetchSensorData = createAsyncThunk(
  'sensors/fetchSensorData',
  async (id) => {
    return await getSensorDataById(id)
  }
)

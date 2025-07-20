import { createSlice } from '@reduxjs/toolkit'
import { fetchSensors, fetchSensorData } from './sensorThunks'

const sensorSlice = createSlice({
  name: 'sensors',
  initialState: {
    list: [],
    selectedId: '',
    data: [],
    loading: false,
    error: null
  },
  reducers: {
    setSelectedId: (state, action) => {
      state.selectedId = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSensors.fulfilled, (state, action) => {
        state.list = action.payload
        state.selectedId = action.payload[0]?.id || ''
        state.error = null
      })
      .addCase(fetchSensorData.fulfilled, (state, action) => {
        state.data = action.payload
        state.error = null
      })
  }
})

export const { setSelectedId } = sensorSlice.actions
export default sensorSlice.reducer

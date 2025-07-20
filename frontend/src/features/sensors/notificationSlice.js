// src/features/notifications/notificationSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    pushNotification: (state, action) => {
      state.push({ id: uuidv4(), ...action.payload })
    },
    removeNotification: (state, action) =>
      state.filter((n) => n.id !== action.payload)
  },
  ///////
  setNotifications: (state, action) => {
    return action.payload.map((item) => ({
      id: uuidv4(),
      ...item
    }))
  }
})

export const { pushNotification, removeNotification, setNotifications } =
  notificationSlice.actions
export default notificationSlice.reducer

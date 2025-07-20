// src/api/alertsApi.js
// src/api/alertsApi.js
import axios from 'axios'

const BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'

export const getAllAlerts = async () => {
  const response = await axios.get(`${BASE}/alerts`)
  return response.data.alerts // ✅ only return the array
}

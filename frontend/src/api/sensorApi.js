import axios from 'axios'
const BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'

const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  return { headers: { Authorization: `Bearer ${token}` } }
}

export const getAllSensors = async () =>
  (await axios.get(`${BASE}/sensors`, getAuthHeader())).data

export const getSensorDataById = async (id) =>
  (await axios.get(`${BASE}/sensors/${id}/data`, getAuthHeader())).data

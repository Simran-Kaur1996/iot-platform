// src/api/authApi.js
import axios from 'axios'
const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'

export const loginUser = async (credentials) => {
  const res = await axios.post(`${API}/auth/login`, credentials)
  return res.data
}

export const signupUser = async (userData) => {
  const res = await axios.post(`${API}/auth/signup`, userData)
  return res.data
}

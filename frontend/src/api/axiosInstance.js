// src/api/axiosInstance.js
import axios from 'axios'

const BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'

// ✅ Exportable manual header helper (optional)
const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {}
}

// ✅ Axios instance with interceptor
const instance = axios.create({
  baseURL: BASE,
  headers: {
    'Content-Type': 'application/json'
  }
})

// ✅ Attach token to every request automatically
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
export { getAuthHeader }

// src/App.jsx
import React from 'react'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AddSensor from './pages/AddSensor'
import DeleteSensor from './pages/DeleteSensor'
import Navbar from './components/Navbar'
import ToastNotifier from './components/ToastNotifier'

const App = () => {
  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token')
    return token ? children : <Navigate to="/login" replace />
  }

  return (
    <BrowserRouter>
      <ToastNotifier />
      <Routes>
        {/* 🔓 Public Route */}
        <Route path="/login" element={<Login />} />

        {/* 🔐 Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <Dashboard />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/add"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <AddSensor />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/delete"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <DeleteSensor />
              </>
            </PrivateRoute>
          }
        />

        {/* 🧭 Fallback for unknown routes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

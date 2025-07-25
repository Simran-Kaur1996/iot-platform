import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CssBaseline } from '@mui/material'
import { Provider } from 'react-redux'
import { store } from './app/store'
import './styles.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <CssBaseline />
    <App />
  </Provider>
)

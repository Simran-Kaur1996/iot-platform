const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

const sensorRoutes = require('./routes/sensorRoutes')
const authRoutes = require('./routes/auth')
app.use(cors())
app.use(express.json())

mongoose.set('strictQuery', true)
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err))

// ✅ Only one instance of this router
app.use('/api', authRoutes)
app.use('/api', sensorRoutes)

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Something went wrong!' })
})
module.exports = app

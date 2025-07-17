// models/Alert.js
const mongoose = require('mongoose')

const AlertSchema = new mongoose.Schema({
  sensor_id: { type: String, required: true },
  location: { type: String },
  timestamp: { type: Date, default: Date.now },
  temperature: { type: Number },
  battery_level: { type: Number },
  alert_triggered: { type: Boolean, required: true }
})

module.exports = mongoose.model('Alert', AlertSchema)

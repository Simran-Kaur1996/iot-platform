const mongoose = require('mongoose')

const sensorDataSchema = new mongoose.Schema({
  sensor_id: String,
  timestamp: Date,
  temperature: Number,
  humidity: Number,
  light: Number,
  voltage: Number,
  battery_level: Number,
  signal_strength: Number,
  status: String,
  alert_triggered: Boolean,
  location: String
})

// ✅ Force correct collection name here
module.exports = mongoose.model('SensorData', sensorDataSchema, 'sensordatas')

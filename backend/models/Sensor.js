const mongoose = require('mongoose')

const sensorSchema = new mongoose.Schema({
  sensor_id: { type: String, required: true, unique: true },
  sensor_type: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, default: 'idle' },
  timestamp: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Sensor', sensorSchema, 'sensors')

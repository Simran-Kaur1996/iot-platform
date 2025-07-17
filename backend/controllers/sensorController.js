const Sensor = require('../models/Sensor')
const SensorData = require('../models/SensorData')
const Alert = require('../models/Alert')
const getHtmlCard = require('../utils/getHtmlCard')
const { sendEmailAlert } = require('../services/sesService')
const { sendSMSAlert } = require('../services/snsService')

// ✅ GET all sensors
exports.getAllSensors = async (req, res) => {
  try {
    const sensors = await Sensor.find()
    res.status(200).json(sensors)
  } catch (err) {
    console.error('Error fetching sensors:', err)
    res.status(500).json({ error: 'Failed to fetch sensors' })
  }
}

// ✅ GET sensor by ID
exports.getSensorById = async (req, res) => {
  try {
    const sensor = await Sensor.findOne({ sensor_id: req.params.id })
    if (!sensor) return res.status(404).json({ error: 'Sensor not found' })
    res.status(200).json(sensor)
  } catch (err) {
    res.status(500).json({ error: 'Error fetching sensor by ID' })
  }
}

// ✅ CREATE sensor with SES + SNS + Alert
exports.createSensor = async (req, res) => {
  try {
    const { sensor_id, sensor_type, location } = req.body

    if (!sensor_id || !sensor_type || !location) {
      return res
        .status(400)
        .json({ error: 'sensor_id, sensor_type, and location are required.' })
    }

    const existing = await Sensor.findOne({ sensor_id })
    if (existing) {
      return res
        .status(409)
        .json({ error: `Sensor ID '${sensor_id}' already exists.` })
    }

    const sensor = new Sensor({
      sensor_id,
      sensor_type,
      location,
      status: 'idle',
      timestamp: new Date()
    })

    await sensor.save()

    // 🧠 Alert DB
    const message = `New sensor added: ${sensor.sensor_id} (${sensor.sensor_type}) in ${sensor.location}`
    await Alert.create({
      sensor_id,
      location,
      message,
      alert_triggered: false,
      timestamp: new Date()
    })

    // 📧 Email + SMS
    const htmlBody = getHtmlCard('sensor_added', sensor)
    await sendEmailAlert('📡 New Sensor Added!', htmlBody)
    await sendSMSAlert(
      `✅ New Sensor Added: ${sensor.sensor_id} (${sensor.sensor_type}) in ${sensor.location}`
    )

    res.status(201).json(sensor)
  } catch (err) {
    console.error('❌ Sensor creation failed:', err.message)
    res
      .status(500)
      .json({ error: 'Failed to create sensor', reason: err.message })
  }
}

// ✅ DELETE sensor with SES + SNS + Alert
exports.deleteSensor = async (req, res) => {
  try {
    const { id } = req.params
    console.log('🛠 Received DELETE request for:', id)

    const sensor = await Sensor.findOneAndDelete({ sensor_id: id })

    if (!sensor) {
      console.log('❌ No sensor found with sensor_id:', id)
      return res.status(404).json({ error: 'Sensor not found' })
    }

    console.log('✅ Sensor found and deleted:', sensor)

    const message = `Sensor deleted: ${sensor.sensor_id} (${sensor.sensor_type}) from ${sensor.location}`

    const alertEntry = await Alert.create({
      sensor_id: sensor.sensor_id,
      location: sensor.location,
      message,
      alert_triggered: false,
      timestamp: new Date()
    })
    console.log('🧠 Alert entry created:', alertEntry)

    const htmlBody = getHtmlCard('sensor_deleted', sensor)

    const emailRes = await sendEmailAlert('🗑️ Sensor Deleted', htmlBody)
    console.log('📧 Email alert sent:', emailRes)

    const smsRes = await sendSMSAlert(
      `🗑️ Sensor Deleted: ${sensor.sensor_id} (${sensor.sensor_type}) from ${sensor.location}`
    )
    console.log('📱 SMS alert sent:', smsRes)

    res.status(200).json({ message: 'Sensor deleted successfully' })
  } catch (err) {
    console.error('❌ Sensor deletion failed:', err.message)
    res
      .status(500)
      .json({ error: 'Failed to delete sensor', reason: err.message })
  }
}

// ✅ GET sensor data by ID
exports.getSensorData = async (req, res) => {
  try {
    const data = await SensorData.find({ sensor_id: req.params.id })
      .sort({ timestamp: -1 })
      .limit(100)
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sensor data' })
  }
}

// ✅ POST new sensor data
exports.addSensorData = async (req, res) => {
  try {
    const newData = new SensorData(req.body)
    await newData.save()
    res.status(201).json(newData)
  } catch (err) {
    res.status(400).json({ error: 'Failed to add sensor data' })
  }
}

// ✅ Check alerts from sensor data
exports.checkAlerts = async (req, res) => {
  try {
    const { sensor_id } = req.body
    console.log('✅ Step 1: sensor_id:', sensor_id)

    const latest = await SensorData.findOne({ sensor_id }).sort({
      timestamp: -1
    })
    console.log('✅ Step 2: latest sensor data:', latest)

    if (!latest) {
      return res.status(404).json({ error: 'No data found for this sensor' })
    }

    const isTriggered = latest.temperature > 30 || latest.battery_level < 20
    console.log('✅ Step 3: Trigger Check:', isTriggered)

    const alert = {
      sensor_id: latest.sensor_id,
      location: latest.location,
      timestamp: latest.timestamp,
      temperature: latest.temperature,
      battery_level: latest.battery_level,
      alert_triggered: isTriggered
    }

    if (isTriggered) {
      console.log('✅ Step 4: Sending alerts')
      const htmlBody = getHtmlCard('alert_triggered', alert)

      // Send Email and SMS
      await sendEmailAlert('🚨 Sensor Alert Triggered!', htmlBody)
      await sendSMSAlert(
        `🚨 Alert! Sensor ${sensor_id} in ${alert.location}:\nTemp: ${alert.temperature}°C\nBattery: ${alert.battery_level}%`
      )

      // Save to DB
      await Alert.create(alert)
    }
    console.log('✅ Step 5: Completed')
    res
      .status(200)
      .json({ alert_triggered: isTriggered, alert: isTriggered ? alert : null })
  } catch (err) {
    console.error('❌ Alert check failed:', err)
    res.status(500).json({ error: 'Failed to check alerts' })
  }
}

// ✅ Manually create alert (optional for admin use)
exports.createAlert = async (req, res) => {
  try {
    const { sensor_id, message } = req.body
    const alert = await Alert.create({
      sensor_id,
      message,
      alert_triggered: true,
      timestamp: new Date()
    })
    res.status(201).json(alert)
  } catch (err) {
    console.error('❌ Manual alert creation failed:', err)
    res.status(400).json({ error: 'Failed to create alert' })
  }
}

// ✅ Get all triggered alerts for frontend notifications
exports.getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ alert_triggered: true })
      .sort({ timestamp: -1 })
      .limit(50)

    res.status(200).json({ alerts })
  } catch (err) {
    console.error('❌ Error fetching alerts:', err)
    res.status(500).json({ error: 'Failed to get alerts' })
  }
}
// ✅ Get alerts for a specific sensor

exports.getAlertsBySensorId = async (req, res) => {
  try {
    const sensorId = req.params.sensor_id || req.query.sensor_id

    const alerts = await SensorData.find({
      sensor_id: sensorId,
      alert_triggered: true
    }).sort({ timestamp: -1 })
    console.log('🔍 Sensor ID received:', req.params.sensor_id)
    res.status(200).json({ alerts })
  } catch (err) {
    console.error('❌ Error fetching alerts by sensor_id:', err)
    res.status(500).json({ error: 'Failed to get alerts for this sensor' })
  }
}
exports.insertTestAlert = async (req, res) => {
  try {
    const alert = await Alert.create(req.body)
    res.status(201).json({ message: '✅ Test alert inserted', alert })
  } catch (err) {
    console.error('❌ Failed to insert test alert:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

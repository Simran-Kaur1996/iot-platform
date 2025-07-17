const express = require('express')
const router = express.Router()
const Alert = require('../models/Alert')
const controller = require('../controllers/sensorController')
const verifyToken = require('../middleware/authMiddleware')

// 🔐 Apply auth middleware globally
router.use(verifyToken)

// 📡 Sensor Routes
router.get('/sensors', controller.getAllSensors)
router.post('/sensors', controller.createSensor)
router.get('/sensors/:id', controller.getSensorById)
router.delete('/sensors/:id', controller.deleteSensor)
router.get('/sensors/:id/data', controller.getSensorData)
router.post('/sensors/:id/data', controller.addSensorData)

// 🚨 Alert Routes
router.get('/alerts/:sensor_id', controller.getAlertsBySensorId)
router.get('/alerts', controller.getAlerts)
router.post('/alerts', controller.createAlert)
router.post('/alerts/check', controller.checkAlerts)

router.post('/alerts/test', controller.insertTestAlert)

// 🧪 Optional: Latest 10 alerts (for dashboard preview)
router.get('/', async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 }).limit(10)
    res.json(alerts)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch alerts' })
  }
})

module.exports = router

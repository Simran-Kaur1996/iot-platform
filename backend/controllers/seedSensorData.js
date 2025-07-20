const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Sensor = require('../models/Sensor')
const SensorData = require('../models/SensorData')

dotenv.config()

const seedSensors = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    const uniqueSensors = await SensorData.aggregate([
      { $group: { _id: '$sensor_id', doc: { $first: '$$ROOT' } } }
    ])

    const sensorDocs = uniqueSensors.map((item) => ({
      sensor_id: item._id,
      sensor_type: item.doc.sensor_type || 'temperature',
      location: item.doc.location || 'lab1',
      status: item.doc.status || 'offline'
    }))

    await Sensor.deleteMany()
    await Sensor.insertMany(sensorDocs)

    console.log(`✅ Inserted ${sensorDocs.length} sensor metadata records.`)
    process.exit(0)
  } catch (err) {
    console.error('❌ Error seeding sensors:', err)
    process.exit(1)
  }
}

seedSensors()

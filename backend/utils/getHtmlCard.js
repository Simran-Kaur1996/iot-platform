// utils/getHtmlCard.js
function getHtmlCard(type, data) {
  let title = ''
  let details = ''
  let color = ''

  switch (type) {
    case 'sensor_added':
      title = '✅ New Sensor Added'
      color = '#007bff'
      details = `
        <p><strong>ID:</strong> ${data.sensor_id}</p>
        <p><strong>Type:</strong> ${data.sensor_type}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Status:</strong> ${data.status}</p>
        <p><strong>Timestamp:</strong> ${new Date(
          data.timestamp
        ).toLocaleString()}</p>
      `
      break

    case 'sensor_deleted':
      title = '🗑️ Sensor Deleted'
      color = '#ff5722'
      details = `
        <p><strong>Deleted Sensor ID:</strong> ${data.sensor_id}</p>
        <p><strong>Location:</strong> ${data.location || 'N/A'}</p>
        <p><strong>Deleted At:</strong> ${new Date().toLocaleString()}</p>
      `
      break

    case 'alert_triggered':
      title = '🚨 Sensor Alert Triggered'
      color = '#d32f2f'
      details = `
        <p><strong>Sensor ID:</strong> ${data.sensor_id}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Temperature:</strong> ${data.temperature}°C</p>
        <p><strong>Battery Level:</strong> ${data.battery_level}%</p>
        <p><strong>Time:</strong> ${new Date(
          data.timestamp
        ).toLocaleString()}</p>
      `
      break

    default:
      title = '📢 Notification'
      color = '#333'
      details = `<p>Unknown notification type.</p>`
  }

  return `
    <div style="font-family: Arial; padding: 16px; border: 1px solid #ccc; border-radius: 8px;">
      <h2 style="color: ${color};">${title}</h2>
      ${details}
    </div>
  `
}

module.exports = getHtmlCard

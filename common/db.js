const mongoose = require('mongoose')
const { DB_URL } = require('./config')

module.exports = () => {
  mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true
  })

  const db = mongoose.connection

  db.on('error', () => console.error('Database connection failed!'))

  db.on('connected', () => console.log('Database connected!'))

  return db
}

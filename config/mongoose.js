const mongoose = require('mongoose')

const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost/expense-tracker'

mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).catch(err => console.log(err))

const db = mongoose.connection

db.on('error', () => console.log('mongodb error!'))
db.once('open', () => console.log('mongodb connected!'))

module.exports = db

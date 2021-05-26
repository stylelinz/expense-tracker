const mongoose = require('mongoose')

const { Schema } = mongoose

const recordSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true }
})

module.exports = mongoose.model('Records', recordSchema)

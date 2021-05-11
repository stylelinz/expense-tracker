const mongoose = require('mongoose')

const { Schema } = mongoose

const recordSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  category: { type: Schema.Types.String, ref: 'Category' },
  amount: { type: Number, required: true }
})

module.exports = mongoose.model('RecordModel', recordSchema)

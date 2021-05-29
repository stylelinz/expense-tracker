const mongoose = require('mongoose')

const { Schema } = mongoose

const recordSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
    index: true
  }
})

module.exports = mongoose.model('Records', recordSchema)

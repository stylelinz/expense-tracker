const mongoose = require('mongoose')

const { Schema } = mongoose

const categorySchema = new Schema({
  categoryName: { type: String, required: true },
  categoryIcon: { type: String, required: true }
})

module.exports = mongoose.model('Categories', categorySchema)

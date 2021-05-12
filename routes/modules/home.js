const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')
const Category = require('../../models/Category')

router.get('/', async (req, res) => {
  // Render Category options
  const records = await Record.find().populate({
    path: 'categoryId'
  }).lean()
  const totalAmount = records.map(record => record.amount).reduce((prev, current) => prev + current)
  return res.render('index', { records, totalAmount })
})

module.exports = router

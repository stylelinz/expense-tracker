const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')
const Category = require('../../models/Category')

router.get('/', async (req, res) => {
  try {
    const { category } = req.query
    const categories = await Category.find().lean()
    // Render Category options
    let records = await Record.find().populate({ path: 'categoryId' }).lean().sort({ date: 'desc' })
    const filteredRecords = records.filter(record => record.categoryId.categoryName === category)
    if (category) {
      records = filteredRecords
    }
    const amounts = records.map(record => record.amount)
    const totalAmount = amounts.length ? amounts.reduce((prev, current) => prev + current) : 0
    return res.render('index', { records, totalAmount, categories })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router

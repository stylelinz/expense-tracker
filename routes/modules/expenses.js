const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')
const Category = require('../../models/Category')

router.get('/create', async (req, res) => {
  const categories = await Category.find().lean()
  const date = new Date()
  const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  return res.render('create', { categories, today })
})

router.post('/', async (req, res) => {
  try {
    const newExpense = req.body
    await Record.create(newExpense)
    return res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

module.exports = router

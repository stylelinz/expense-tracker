const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')
const Category = require('../../models/Category')
const dateFormat = require('../../util/formattedDate')

router.get('/create', async (req, res) => {
  const categories = await Category.find().lean()
  const today = dateFormat()
  return res.render('create', { categories, today })
})

router.get('/:id/edit', async (req, res) => {
  try {
    const { id } = req.params
    const categories = await Category.find().lean()
    const expense = await Record.findById(id).lean()
    expense.date = dateFormat(expense.date)
    const today = dateFormat()
    return res.render('edit', { categories, expense, today })
  } catch (err) {
    console.log(err)
  }
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

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const editedExpense = req.body
    await Record.findByIdAndUpdate(id, editedExpense)
    return res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await Record.findByIdAndDelete(id)
    return res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

module.exports = router

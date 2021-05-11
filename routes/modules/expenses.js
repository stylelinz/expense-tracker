const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')

router.get('/create', (req, res) => {
  return res.render('create')
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

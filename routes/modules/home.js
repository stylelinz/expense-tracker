const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')
// const Category = require('../../models/Category')

router.get('/', async (req, res) => {
  const records = await Record.find().lean()
  return res.render('index', { records })
})

module.exports = router

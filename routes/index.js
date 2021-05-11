const express = require('express')

const home = require('./modules/home')
const expenses = require('./modules/expenses')

const router = express.Router()

router.use('/', home)
router.use('/expenses', expenses)

module.exports = router

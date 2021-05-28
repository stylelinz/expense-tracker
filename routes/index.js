const express = require('express')

const home = require('./modules/home')
const expenses = require('./modules/expenses')
const users = require('./modules/users')

const router = express.Router()

router.use('/users', users)
router.use('/expenses', expenses)
router.use('/', home)

module.exports = router

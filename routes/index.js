const express = require('express')

const home = require('./modules/home')
const expenses = require('./modules/expenses')
const users = require('./modules/users')

const { authenticator } = require('../middleware/auth')

const router = express.Router()

router.use('/users', users)
router.use('/expenses', authenticator, expenses)
router.use('/', authenticator, home)

module.exports = router

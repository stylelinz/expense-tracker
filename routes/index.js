const express = require('express')

const home = require('./modules/home')
const expenses = require('./modules/expenses')
const users = require('./modules/users')
const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth')

const router = express.Router()

router.use('/users', users)
router.use('/auth', auth)
router.use('/expenses', authenticator, expenses)
router.use('/', authenticator, home)

module.exports = router

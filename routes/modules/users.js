const router = require('express').Router()

router.get('/login', (req, res) => {
  return res.render('login')
})

router.get('/register', (req, res) => {
  return res.render('register')
})

router.post('/login')

router.post('/register')

router.get('/logout', (req, res) => {
  req.logout()
})

module.exports = router

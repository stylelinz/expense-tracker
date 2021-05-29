const router = require('express').Router()
const passport = require('passport')

router.get('/login', (req, res) => {
  return res.render('login')
})

router.get('/register', (req, res) => {
  return res.render('register')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.post('/register')

router.get('/logout', (req, res) => {
  req.logout()
})

module.exports = router

const router = require('express').Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

const User = require('../../models/User')
const { validateRegister, errorFormatter } = require('../../middleware/validate')
const { validationResult } = require('express-validator')

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

router.post('/register', validateRegister, async (req, res) => {
  const errors = validationResult(req).formatWith(errorFormatter)
  const { name, email, password, confirmPassword } = req.body
  // 如果有不合規定的輸入，會在這裡被擋下
  if (!errors.isEmpty()) {
    res.status(400)
    return res.render('register', {
      name,
      email,
      password,
      confirmPassword,
      errorMsg: errors.array()
    })
  }
  // 若通過驗證，則在資料庫建立使用者
  try {
    // 為輸入的密碼加入鹽與雜湊
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    await User.create({ name, email, password: hash })
    return res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router

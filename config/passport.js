const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const User = require('../models/User')

module.exports = app => {
  // 初始化passport模組
  app.use(passport.initialize())
  app.use(passport.session())

  // 設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({ email })
        if (!user) {
          return done(null, false, req.flash('warningMsg', '信箱帳號或密碼錯誤，請再輸入一次。'))
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
          return done(null, false, req.flash('warningMsg', '信箱帳號或密碼錯誤，請再輸入一次。'))
        }

        return done(null, user)
      } catch (err) {
        done(err)
      }
    }))

  // 設定序列化/反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).lean()
      done(null, user)
    } catch (err) {
      done(err)
    }
  })
}

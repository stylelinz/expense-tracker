const { body } = require('express-validator')

const User = require('../models/User')

module.exports = {
  validateRecord: [
    body('name').notEmpty().withMessage('支付名稱為必填。').bail()
      .isLength({ max: 10 }).withMessage('名稱最多10個字。').bail()
      .escape(),
    body('date').isDate().withMessage('請輸入正確的日期格式。').bail(),
    body('amount').notEmpty().withMessage('支付金額為必填。').bail()
      .isInt({ min: 1, max: 9999999999 }).withMessage('醒醒吧，你沒有這麼多錢。'),
    body('merchant').isLength({ max: 10 }).withMessage('店家名稱為10字以內。')
  ],
  validateRegister: [
    body('name').notEmpty().withMessage('請輸入名稱').bail()
      .isLength({ max: 12 }).withMessage('名稱限制12個字'),
    body('email').notEmpty().withMessage('請輸入 Email').bail()
      .isEmail().withMessage('請輸入正確的 Email 格式')
      .custom(async (email) => {
        const user = await User.findOne({ email })
        if (user) {
          throw new Error('這個 Email 已經用過了。')
        }
      }),
    body('password').notEmpty().withMessage('請輸入密碼').bail()
      .isLength({ min: 8 }).withMessage('密碼至少8個字。'),
    body('confirmPassword').custom((confirmPwd, { req }) => {
      const { password } = req.body
      if (confirmPwd !== password) {
        throw new Error('密碼不正確，請再輸入一次。')
      }
      return true
    })
  ],
  errorFormatter: ({ msg }) => {
    return msg
  }
}

const { body } = require('express-validator')

const Category = require('../models/Category')
const categories = Category.find(null, 'categoryName').map(item => item.categoryName)

module.exports = {
  record: [
    body().trim(),
    body('name').notEmpty().withMessage('支付名稱為必填。').bail()
      .isLength({ max: 10 }).withMessage('名稱最多10個字。').bail()
      .escape(),
    body('date').isDate().withMessage('請輸入正確的日期格式。').bail(),
    body('category').isIn(categories).withMessage('請選擇類別'),
    body('amount').notEmpty().withMessage('支付金額為必填。').bail()
      .isInt({ min: 1, max: 9999999999 }).withMessage('醒醒吧，你沒有這麼多錢。')
  ]
}

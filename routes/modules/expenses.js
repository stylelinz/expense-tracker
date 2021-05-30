const express = require('express')
const router = express.Router()
const { validationResult } = require('express-validator')

const Record = require('../../models/Record')
const Category = require('../../models/Category')
const { validateRecord, errorFormatter } = require('../../middleware/validate')
// dateFormat函式會將輸入的日期格式轉換為瀏覽器支援的'YYYY-MM-DD'格式，
// 沒有輸入值時，預設為今天日期
const dateFormat = require('../../util/formattedDate')

// 新增紀錄頁面
router.get('/create', async (req, res) => {
  try {
    const categories = await Category.find().lean()
    const today = dateFormat()
    return res.render('create', { categories, today })
  } catch (err) {
    console.log(err)
  }
})

// 修改紀錄頁面
router.get('/:_id/edit', async (req, res) => {
  try {
    const { _id } = req.params
    const { _id: userId } = req.user
    const [categories, record] = await Promise.all([Category.find().lean(), Record.findOne({ _id, userId }).lean()])
    record.date = dateFormat(record.date)
    const today = dateFormat()
    return res.render('edit', { categories, record, today })
  } catch (err) {
    console.log(err)
  }
})

// 新增紀錄功能，含表單驗證
router.post('/', validateRecord, async (req, res) => {
  const newRecord = req.body
  newRecord.userId = req.user._id
  const errors = validationResult(req).formatWith(errorFormatter)
  if (!errors.isEmpty()) {
    const categories = await Category.find().lean()
    res.status(400)
    return res.render('create', { categories, newRecord, errorMsg: errors.array() })
  }
  try {
    await Record.create(newRecord)
    return res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

// 修改紀錄功能，含表單驗證
router.put('/:_id', validateRecord, async (req, res) => {
  const { _id } = req.params
  const { _id: userId } = req.user
  const editedRecord = req.body
  editedRecord.userId = userId
  const errors = validationResult(req).formatWith(errorFormatter)
  if (!errors.isEmpty()) {
    const categories = await Category.find().lean()
    const today = dateFormat()
    editedRecord._id = _id
    res.status(400)
    return res.render('edit', { categories, today, record: editedRecord, errorMsg: errors.array() })
  }
  try {
    await Record.findOneAndUpdate({ _id, userId }, editedRecord)
    return res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

// 刪除記錄功能
router.delete('/:_id', async (req, res) => {
  try {
    const { _id } = req.params
    const { _id: userId } = req.user
    await Record.deleteOne({ _id, userId })
    return res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

module.exports = router

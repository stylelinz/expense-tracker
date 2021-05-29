const express = require('express')
const router = express.Router()
const { validateResult } = require('express-validator')

const Record = require('../../models/Record')
const Category = require('../../models/Category')
const validator = require('../../middleware/validate')
// dateFormat函式會將輸入的日期格式轉換為瀏覽器支援的'YYYY-MM-DD'格式，
// 沒有輸入值時，預設為今天日期
const dateFormat = require('../../util/formattedDate')

// 新增紀錄頁面
router.get('/create', validator.record, async (req, res) => {
  const categories = await Category.find().lean()
  const today = dateFormat()
  return res.render('create', { categories, today })
})

// 修改紀錄頁面
router.get('/:id/edit', async (req, res) => {
  try {
    const { id } = req.params
    const { _id: userId } = req.user
    const [categories, record] = await Promise.all([Category.find().lean(), Record.findOne({ id, userId }).lean()])
    record.date = dateFormat(record.date)
    const today = dateFormat()
    return res.render('edit', { categories, record, today })
  } catch (err) {
    console.log(err)
  }
})

router.post('/', async (req, res) => {
  try {
    const newRecord = req.body
    await Record.create(newRecord)
    return res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const editedRecord = req.body
    await Record.findByIdAndUpdate(id, editedRecord)
    return res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await Record.findByIdAndDelete(id)
    return res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

module.exports = router

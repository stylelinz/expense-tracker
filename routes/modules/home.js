const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')
const Category = require('../../models/Category')

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find(null, 'categoryName').lean()
    // Render Category options
    const records = await getAllRecords()
    const [{ total: totalAmount }] = await Record.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }])
    return res.render('index', { records, totalAmount, categories })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router

async function getMonthOptions () {
  const dates = await Record.aggregate([{ $group: { _id: { $dateToString: { format: '%Y-%m', date: '$date' } } } }])
  return dates.map(date => date._id)
}

async function getAllRecords () {
  const pipeline = [
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: 'categoryName',
        as: 'c'
      }
    },
    { $unwind: { path: '$c' } },
    {
      $project: {
        name: 1,
        amount: 1,
        category: 1,
        icon: '$c.categoryIcon',
        date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }
      }
    }
  ]
  return await Record.aggregate(pipeline)
}

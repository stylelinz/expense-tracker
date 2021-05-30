const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')
const Category = require('../../models/Category')

router.get('/', async (req, res) => {
  try {
    const option = req.query
    const { _id: userId } = req.user
    // Render Category options
    const [categories, months] = await Promise.all([Category.find(null, 'categoryName').lean(), getMonthsByUser(userId)])
    const records = await getAllRecords(userId, option)
    const totalAmount = getTotalAmount(records)
    records.forEach(record => {
      record.amount = formatNumber(record.amount)
    })
    return res.render('index', { records, totalAmount, categories, months, option })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router

async function getMonthsByUser (userId) {
  const dates = await Record.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: {
          $dateToString: { format: '%Y-%m', date: '$date' }
        }
      }
    },
    { $sort: { _id: -1 } }
  ])
  return dates.map(date => date._id)
}

async function getAllRecords (userId, filterOptions) {
  const pipeline = [
    { $match: { userId } },
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
        merchant: 1,
        date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }
      }
    },
    { $sort: { date: -1 } }
  ]
  const options = filterPipeline(filterOptions)
  if (options.length) {
    pipeline.unshift(...options)
  }
  return await Record.aggregate(pipeline)
}

function filterPipeline (options) {
  const pipeline = []
  if (options.category) {
    pipeline.push({ $match: { category: options.category } })
  }
  if (options.date) {
    pipeline.push({
      $match: {
        $expr: {
          $eq: [
            options.date,
            { $dateToString: { date: '$date', format: '%Y-%m' } }
          ]
        }
      }
    })
  }
  return pipeline
}

function getTotalAmount (records) {
  if (records.length === 0) return 0
  const total = records.map(record => record.amount).reduce((prev, curr) => prev + curr)
  return formatNumber(total)
}

function formatNumber (number) {
  return number.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ',')
}

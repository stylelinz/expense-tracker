const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')
const Category = require('../../models/Category')

router.get('/', async (req, res) => {
  try {
    const option = req.query
    // Render Category options
    const categories = await Category.find(null, 'categoryName').lean()
    const months = await getRecordsMonth()
    const records = await getAllRecords(option)
    const totalAmount = records.length ? await getTotalAmount(option) : 0
    return res.render('index', { records, totalAmount, categories, months })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router

async function getRecordsMonth () {
  const dates = await Record.aggregate([{ $group: { _id: { $dateToString: { format: '%Y-%m', date: '$date' } } } }])
  return dates.map(date => date._id)
}

async function getAllRecords (filterOptions) {
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
    },
    { $sort: { date: -1 } }
  ]
  const options = filterPipeline(filterOptions)
  if (options.length) {
    pipeline.unshift(...options)
  }
  return await Record.aggregate(pipeline)
}

async function getTotalAmount (filterOptions) {
  const pipeline = [{ $group: { _id: null, total: { $sum: '$amount' } } }]
  const options = filterPipeline(filterOptions)
  if (options.length) {
    pipeline.unshift(...options)
  }
  const [{ total }] = await Record.aggregate(pipeline)
  return total
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

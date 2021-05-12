const Record = require('../Record')
const Category = require('../Category')
const db = require('../../config/mongoose')

const records = require('./records.json')

db.once('open', async () => {
  try {
    for (const record of records) {
      const category = await Category.findOne({ categoryName: record.category }).lean()
      await Record.create({
        name: record.name,
        amount: record.amount,
        categoryId: category._id
      })
      console.log(`Seed: ${record.name} created.`)
    }
    await db.close()
    console.log('Close database...')
  } catch (err) {
    console.log(err)
  }
})

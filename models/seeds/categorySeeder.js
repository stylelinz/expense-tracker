const Category = require('../Category')
const db = require('../../config/mongoose')
const categories = require('./categories.json')

db.once('open', async () => {
  try {
    for (const category of categories) {
      await Category.create(category)
    }
    await db.close()
    console.log('Close database...')
  } catch (err) {
    console.log(err)
  }
})

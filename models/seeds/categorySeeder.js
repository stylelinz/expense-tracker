const Category = require('../Category')
const db = require('../../config/mongoose')
const categories = require('./categories.json')

db.once('open', async () => {
  for (const category of categories) {
    await Category.create(category)
  }
  await db.close()
  console.log('Close database...')
})

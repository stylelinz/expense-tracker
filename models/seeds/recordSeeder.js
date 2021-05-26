const Record = require('../Record')
const db = require('../../config/mongoose')

const records = require('./records.json')

db.once('open', async () => {
  try {
    for (const record of records) {
      await Record.create(record)
      console.log(`Seed: ${record.name} created.`)
    }
    await db.close()
    console.log('Close database...')
  } catch (err) {
    console.log(err)
  }
})

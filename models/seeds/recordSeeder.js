const Record = require('../Record')
const db = require('../../config/mongoose')

const records = require('./records.json')

db.once('open', async () => {
  for (const record of records) {
    await Record.create(record)
    console.log(`Seed: ${record.name} created.`)
  }
  await db.close()
  console.log('Close database...')
})

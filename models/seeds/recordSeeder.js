const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

const Record = require('../Record')
const User = require('../User')
const records = require('./records.json')

const SEED_USER = {
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
}

db.once('open', async () => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(SEED_USER.password, salt)
    const user = await User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    })
    const { _id: userId } = user
    for (const record of records) {
      await Record.create(Object.assign(record, { userId }))
      console.log(`Seed: ${record.name} created.`)
    }
    console.log('All seeds are done.')
    await db.close()
    console.log('Close database.')
  } catch (err) {
    console.log(err)
  }
})

const express = require('express')
const exphbs = require('express-handlebars')
const helpers = require('handlebars-helpers')(['array', 'comparison'])

const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = 3000

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers
}))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () => console.log(`Express is listening on http://localhost:${port}`))

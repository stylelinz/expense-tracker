const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
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
app.use(express.static('public'))
app.use(routes)

app.listen(port, () => console.log(`Express is listening on http://localhost:${port}`))

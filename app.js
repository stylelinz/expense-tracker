const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const helpers = require('handlebars-helpers')()
const session = require('express-session')

const usePassport = require('./config/passport')
const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = process.env.PORT || 3000

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers
}))
app.set('view engine', 'hbs')
app.use(session({
  secret: 'ThisIsSecret',
  resave: false,
  saveUninitialized: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)
app.use(express.static('public'))
app.use(routes)

app.listen(port, () => console.log(`Express is listening on http://localhost:${port}`))

const path = require('path')
const dotenv = require('dotenv')
dotenv.config({ path: path.join(__dirname, '../.env') })

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const delegator = require('./delegator')

const app = express()

app.use(cors({
  origin: true,
  credentials: true
}))

app.use(bodyParser.json())

app.use('/', async (req, res, next) => {
  const statusCode = await delegator.post(req)
  res.json({ statusCode })

  next()
})
app.listen(3500)

const bootstrap = async () => {
  await delegator.init()
  console.log('bootstrap completed.')
}
bootstrap()

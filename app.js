const Koa = require('koa')
const path = require('path')
const fs = require('fs')
const bodyparser = require('koa-body')
const jsonError = require('koa-json-error')
const paramter = require('koa-parameter')
const static = require('koa-static')
const morgan = require('koa-morgan')
const logger = require('koa-logger')
const connectDb = require('./common/db')
const routers = require('./routers')

const logStream = fs.createWriteStream(__dirname + '/logs/requests.log', {
  flags: 'a',
  encoding: 'utf8'
})
const app = new Koa()
connectDb()

app.use(logger())
app.use(morgan('combined', { stream: logStream }))
app.use(
  jsonError({
    postFormat: (e, { stack, ...others }) =>
      process.env.NODE_ENV === 'production' ? others : { stack, ...others }
  })
)
app.use(static(path.join(__dirname, './public')))
app.use(
  bodyparser({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, './public/uploads'),
      keepExtensions: true
    }
  })
)
app.use(paramter(app))
app.use(routers.routes())

app.listen(3000)

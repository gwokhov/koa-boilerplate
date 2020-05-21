const Router = require('koa-router')
const fs = require('fs')
const router = new Router()

fs.readdirSync(__dirname).forEach(file => {
  const fileName = file.match(/([\w\W]*).js/)[1]
  if (fileName === 'index') {
    return
  }
  const route = require(`./${fileName}`)
  router.use(route.routes(), route.allowedMethods())
})

module.exports = router

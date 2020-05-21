const Router = require('koa-router')
const ctrl = require('../controllers/home')
const router = new Router()

router.post('/upload', ctrl.upload)

module.exports = router

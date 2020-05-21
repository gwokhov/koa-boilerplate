const Router = require('koa-router')
const jwt = require('koa-jwt')
const ctrl = require('../controllers/user')
const commCtrl = require('../controllers/common')

const router = new Router({ prefix: '/users' })

router.get('/', ctrl.find)
router.post('/', ctrl.create)
router.get('/:id', commCtrl.checkIsUserExist, ctrl.findById)
router.patch('/:id', commCtrl.auth, commCtrl.checkIsOwner, ctrl.update)
router.post('/login', ctrl.login)

module.exports = router

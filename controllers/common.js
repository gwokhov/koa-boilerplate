const User = require('../models/user')
const jwt = require('koa-jwt')
const ERR_MSG = require('../common/errorMsg')
const { JWT_SECRET } = require('../common/config')

module.exports = {
  async checkIsOwner(ctx, next) {
    if (ctx.params.id !== ctx.state.user._id) {
      ctx.throw(403, ERR_MSG.NO_CONTROL_PERMISSION)
    }
    await next()
  },

  async checkIsUserExist(ctx, next) {
    let user = null
    try {
      user = await User.findById(ctx.params.id)
    } catch (e) {
      ctx.throw(404, ERR_MSG.USER_NOT_EXIST)
    }
    if (!user) {
      ctx.throw(404, ERR_MSG.USER_NOT_EXIST)
    }
    await next()
  },

  auth: jwt({ secret: JWT_SECRET })
}

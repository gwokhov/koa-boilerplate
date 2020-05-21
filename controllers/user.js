const User = require('../models/user')
const jwt = require('jsonwebtoken')
const ERR_MSG = require('../common/errorMsg')
const { JWT_SECRET } = require('../common/config')

module.exports = {
  async find(ctx) {
    ctx.body = await User.find()
  },

  async findById(ctx) {
    const user = await User.findById(ctx.params.id)
    ctx.body = user
  },

  async create(ctx) {
    ctx.verifyParams({
      username: {
        type: 'string',
        required: true
      },
      password: {
        type: 'string',
        required: true
      }
    })
    const { username } = ctx.request.body
    const user = await User.findOne({ username })
    if (user) {
      ctx.throw(409, ERR_MSG.USER_ALREADY_REGISTERED)
    }
    ctx.body = await new User(ctx.request.body).save()
  },

  async update(ctx) {
    ctx.verifyParams({
      username: {
        type: 'string',
        required: false
      },
      password: {
        type: 'string',
        required: false
      }
    })
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body, {
      new: true
    })
    ctx.body = user
  },

  async remove(ctx) {
    await User.findByIdAndRemove(ctx.params.id)
    ctx.status = 204
  },

  async login(ctx) {
    ctx.verifyParams({
      username: {
        type: 'string',
        required: true
      },
      password: {
        type: 'string',
        required: true
      }
    })
    const { username, password } = ctx.request.body
    try {
      const user = await User.findOne({ username }).select('+password')
      if (user && user.comparePwd(password)) {
        const { _id } = user
        const token = jwt.sign({ _id, username }, JWT_SECRET, {
          expiresIn: '1d'
        })
        ctx.body = { token, _id }
      } else {
        ctx.throw(401, ERR_MSG.WRONG_USERNAME_OR_PASSWORD)
      }
    } catch (e) {
      ctx.throw(401, ERR_MSG.WRONG_USERNAME_OR_PASSWORD)
    }
  }
}

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
  {
    __v: {
      type: Number,
      select: false
    },
    username: {
      type: String,
      unique: true,
      require: true
    },
    password: {
      type: String,
      require: true,
      select: false
    }
  },
  { timestamps: true }
)

userSchema.pre('save', function(next) {
  const salt = bcrypt.genSaltSync(8)
  this.password = bcrypt.hashSync(this.password, salt)
  next()
})

userSchema.methods.comparePwd = function(password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', userSchema)

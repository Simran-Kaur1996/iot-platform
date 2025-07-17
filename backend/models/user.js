const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String }
})

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
})

userSchema.methods.comparePassword = function (pw) {
  return bcrypt.compare(pw, this.password)
}

module.exports = mongoose.model('User', userSchema)

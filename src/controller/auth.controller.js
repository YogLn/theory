const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config.js')
class AuthController {
  async login (ctx, next) {
    const { id, name } = ctx.user
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24, // 过期时间单位s
      algorithm: 'RS256' // 采用的算法
    })
    ctx.body = { id, name, token }
  }

  async success (ctx, next) {
    ctx.body = '授权成功'
  }
}

module.exports = new AuthController()

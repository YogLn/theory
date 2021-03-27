const errorTypes = require('../constants/error-types.js')
const service = require('../service/user.service')
const md5password = require('../utils/password-handle')

const verifyUser = async (ctx, next) => {
  // 1. 获取用户名和密码
  const {name, password} = ctx.request.body

  // 2. 判断用户名不能为空
  if(!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }
  // 3. 判断用户名是否被注册过
  const res = await service.getUserByName(name)
  if(res.length) {
    const error = new Error(errorTypes.USER_ALREADY_EXIST)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}

const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body
  ctx.request.body.password = md5password(password)
  await next()
}

module.exports = {
  verifyUser,
  handlePassword
}

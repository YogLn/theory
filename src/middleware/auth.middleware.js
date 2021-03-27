const jwt = require('jsonwebtoken')

const userService = require('../service/user.service')
const authService = require('../service/auth.service')
const errorTypes = require('../constants/error-types')
const md5password = require('../utils/password-handle')
const { PUBLIC_KEY } = require('../app/config')
const verifyLogin = async (ctx, next) => {

  // 1. 获取用户名和密码
  const { name, password } = ctx.request.body

  // 2. 判断用户名密码不能为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  // 3. 判断用户是否存在
  const res = await userService.getUserByName(name)
  const user = res[0]
  if (!user) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXIST)
    return ctx.app.emit('error', error, ctx)
  }

  //  4.判断密码是否正确
  if (md5password(password) !== user.password) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRENT)
    return ctx.app.emit('error', error, ctx)
  }
  ctx.user = user
  await next()
}

// 验证是否授权的中间件
const verifyAuth = async (ctx, next) => {
  console.log('验证授权middleware');
  // 1. 获取token
  const authorization = ctx.headers.authorization
  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }
  const token = authorization.replace('Bearer ', '')
  // 2. 验证token(id/name/iat,/exp)
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    // console.log(result); { id: 9, name: 'yogln', iat: 1616158097, exp: 1616244497 }
    ctx.user = result
    await next()
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION)
    ctx.app.emit('error', error, ctx)
  }
}

const verifyPermission = async (ctx, next) => {
  console.log('验证授权middleware');
  // 1. 获取参数
  const [resourceKey] = Object.keys(ctx.params)
  const tableName = resourceKey.replace('Id', '')
  const resourceId = ctx.params[resourceKey]
  const { id } = ctx.user
  // 2. 查询是否具备权限
  try {
    const isPermission = await authService.checkResource(tableName, resourceId, id)
    if (!isPermission) throw new Error()
  } catch (error) {
    const err = new Error(errorTypes.UNPERMISSION)
    return ctx.app.emit('error', err, ctx)
  }
  await next()
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}
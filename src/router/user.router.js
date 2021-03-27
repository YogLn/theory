const Router = require('koa-router')
const userRouter = new Router({ prefix: '/users' })

const {
  create,
  avatarInfo,
  getUserInfo
} = require('../controller/user.controller')

const {
  verifyUser,
  handlePassword
} = require('../middleware/user.middleware')

userRouter.post('/', verifyUser, handlePassword, create)
// 获取用户的个人信息
userRouter.get('/:userId', getUserInfo)
userRouter.get('/:userId/avatar', avatarInfo)

module.exports = userRouter
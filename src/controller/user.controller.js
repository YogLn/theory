const fs = require('fs')

const userService = require('../service/user.service')
const fileService = require('../service/file.service')

class UserController {
  async create (ctx, next) {
    // 获取用户传递得参数
    const user = ctx.request.body
    // 查询数据(抽取)
    const res = await userService.create(user)
    // 返回数据
    ctx.body = res
  }
  async avatarInfo(ctx, next) {
    const { userId } = ctx.request.params
    const avatarInfo = await fileService.getAvatarById(userId)
    ctx.response.set('content-type', avatarInfo.mimetype)
    ctx.body = fs.createReadStream(`./uploads/avatar/${avatarInfo.filename}`)
  }

  async getUserInfo(ctx, nexy) {
    const { userId } = ctx.request.params
    const res = await userService.getUserInfoById(userId)
    ctx.body = res
  }
}

module.exports = new UserController()

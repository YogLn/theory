const fs = require('fs');

const MomentService = require('../service/moment.service')
const fileService = require('../service/file.service');

const { PICTURE_PATH } = require('../constants/file-path');
class MomentController {
  async create (ctx, next) {
    // 1. 获取数据(user_id, content)
    const userId = ctx.user.id
    const content = ctx.request.body.content
    // 2. 将数据插入到数据库中
    const res = await MomentService.create(userId, content)
    ctx.body = res
  }

  async detail (ctx, next) {
    // 1. 获取某一条动态id
    const momentId = ctx.params.momentId
    // 2. 根据id 查询数据
    const res = await MomentService.getMomentById(momentId)
    ctx.body = res
  }

  async list(ctx,next) {
    // 1. 获取offset, size
    const { offset, size } = ctx.query
    // 2. 查询列表
    const res = await MomentService.getMomentList(offset, size)
    ctx.body = res
  }

  async update(ctx, next) {
    const { momentId } = ctx.request.params
    const {content} = ctx.request.body
    const res = await MomentService.update(content, momentId)
    ctx.body = res
  }

  async remove(ctx, next) {
    const { momentId } = ctx.request.params 
    const res = await MomentService.remove(momentId)
    res.status = 200
    ctx.body = res
  }

  async addLabels(ctx, next) {
    const { labels } = ctx
    const { momentId } = ctx.request.params
    for(let label of labels) {
      const isExist = await MomentService.hasLabel(momentId, label.id)
      if(!isExist) {
        await MomentService.addLabel(momentId, label.id)
      }
    }
    ctx.body = {
      status: 200,
      msg: '标签添加成功~'
    }
  }

  async fileInfo(ctx, next) {
    let { filename } = ctx.params;
    const fileInfo = await fileService.getFileByFilename(filename);
    const { type } = ctx.query;
    const types = ["small", "middle", "large"];
    if (types.some(item => item === type)) {
      filename = filename + '-' + type;
    }

    ctx.response.set('content-type', fileInfo.mimetype);
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
  }
}

module.exports = new MomentController()
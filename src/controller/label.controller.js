const service = require('../service/label.service')
class LabelController {
  async create(ctx, next) {
    const { name } = ctx.request.body
    const res = await service.create(name)
    res.status = 200
    ctx.body = res 
  }

  async list(ctx, next) {
    const { limit, offset } = ctx.query;
    const result = await service.getLabels(limit, offset);
    const res = {labels: result,status: 200}
    ctx.body = res;
  }
}
module.exports = new LabelController()

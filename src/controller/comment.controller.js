const commentService = require("../service/comment.service")


class CommentController {
  async create (ctx, next) {
    const { momentId, content } = ctx.request.body
    const { id } = ctx.user
    const res = await commentService.create(momentId, content, id)
    res.status = 200
    ctx.body = res
  }

  async replay (ctx, next) {
    const { commentId } = ctx.request.params
    const { momentId, content } = ctx.request.body
    const { id } = ctx.user
    const res = await commentService.replay(momentId, content, id, commentId)
    res.status = 200
    ctx.body = res
  }

  async update (ctx, next) {
    const { commentId } = ctx.request.params
    const { content } = ctx.request.body
    const res = await commentService.update(commentId, content)
    res.status = 200
    ctx.body = res
  }

  async remove (ctx, next) {
    const { commentId } = ctx.request.params
    const res = await commentService.remove(commentId)
    res.status = 200
    ctx.body = res
  }
  async list (ctx, next) {
    const { momentId } = ctx.query
    const res = await commentService.list(momentId)
    res.status = 200
    ctx.body = res
  }
}

module.exports = new CommentController()

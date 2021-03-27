const Koa = require('koa-router')

const commentRouter = new Koa({ prefix: '/comment' })
const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware')
const {
  create,
  replay,
  update,
  remove,
  list
} = require('../controller/comment.controller')

commentRouter.post('/', verifyAuth, create)
commentRouter.post('/:commentId/replay', verifyAuth, replay)
commentRouter.patch('/:commentId', verifyAuth, verifyPermission, update)
commentRouter.delete('/:commentId', verifyAuth, verifyPermission, remove)
commentRouter.get('/',list)

module.exports = commentRouter
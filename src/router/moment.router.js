const Koa = require('koa-router')

const momentRouter = new Koa({ prefix: '/moment' })

const {
  create,
  detail,
  list,
  update,
  remove,
  addLabels,
  fileInfo
} = require('../controller/moment.controller')

// 发表动态之前验证是否登录
const {
  verifyAuth,
  verifyPermission,
} = require('../middleware/auth.middleware')

const {
  verifyLabelExists
} = require('../middleware/label.middleware')

momentRouter.post('/', verifyAuth, create)
momentRouter.get('/', list)
momentRouter.get('/:momentId', detail)

momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update)
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove)

// 给动态添加标签
momentRouter.post('/:momentId/labels', verifyAuth,verifyPermission, verifyLabelExists, addLabels)
// 动态配图的服务
momentRouter.get('/images/:filename', fileInfo);

module.exports = momentRouter


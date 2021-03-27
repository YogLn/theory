const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const useRoutes = require('../router')

// 跨域解决
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*")
  await next()
})

// const userRouter = require('../router/user.router')
// const authRouter = require('../router/auth.router')
const errorHandler = require('./error-handle')
app.use(bodyParser())

// app.use(userRouter.routes())
// app.use(userRouter.allowedMethods())
// app.use(authRouter.routes())
// app.use(authRouter.allowedMethods())
useRoutes(app)

app.on('error', errorHandler)

module.exports = app
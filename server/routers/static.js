// 静态文件的转发

const Router = require('koa-router')
const send = require('koa-send')

const staticRouter = new Router()
staticRouter.prefix('/public')

staticRouter.get('/*', async ctx => {
    await send(ctx, ctx.path)
})

module.exports = staticRouter

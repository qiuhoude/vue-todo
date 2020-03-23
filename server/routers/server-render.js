const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html'

  // 此处的 context就是对应 server-entry.js 中的context参数
  const context = {url: ctx.path}

  try {

    // renderToString 调用之后会让 context中填充对应的值,会在 server-entry.js 调用之后执行
    const appString = await renderer.renderToString(context)

    // if (context.router.currentRoute.fullPath !== ctx.path) {
    //   return ctx.redirect(context.router.currentRoute.fullPath)
    // }

    const {title} = context.meta.inject()

    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      title: title,
      initState: context.renderState()
    })

    ctx.body = html
  } catch (err) {
    console.log('render error', err)
    throw err
  }
}

const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const MemoryFS = require('memory-fs')
const webpack = require('webpack')

const VueServerRenderer = require('vue-server-renderer')
const serverRender = require('./server-render')


let bundle
// 监听webpack文件变化,并进行重新编译
// 对应文档地址 https://www.webpackjs.com/api/node
const serverConfig = require('../../build/webpack.config.server')
const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs
serverCompiler.watch({}, (err, stats) => {
  if (err) {
    throw err
  }
  const info = stats.toJson()
  info.errors.forEach(err => console.log(err))
  info.warnings.forEach(warn => console.warn(warn))

  const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')
  // 从虚拟内存读取中
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle generated...~~~~~')
})


// 创建路由
const router = new Router()
router.get('*', async (ctx) => {
  if (!bundle) { //builde加载成功
    ctx.body = '你等一会，别着急......'
    return
  }

  // 获取配置
  const clientManifestResp = await axios.get(
    'http://127.0.0.1:9200/public/vue-ssr-client-manifest.json')
  const clientManifest = clientManifestResp.data
  //ejs模板
  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8')

  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    clientManifest // （可选）客户端构建 manifest
  })
  // 进行渲染

  await serverRender(ctx, renderer, template)

})

// 导出路由
module.exports = router

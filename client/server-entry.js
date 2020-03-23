import createApp from './create-app'


export default context => {
  return new Promise((resolve, reject) => {
    const {app, router, store} = createApp()

    // vue-routers 的push 编程式导航
    // https://router.vuejs.org/zh/guide/essentials/navigation.html
    // 设置服务器端 routers 的位置
    router.push(context.url)
    // 该方法把一个回调排队，在路由完成初始导航时调用
    // 这意味着它可以解析所有的异步进入钩子和路由初始化相关联的异步组件
    router.onReady(() => {
      // 返回目标位置或是当前路由匹配的组件数组 (是数组的定义/构造类，不是实例)。
      // 通常在服务端渲染的数据预加载时使用
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('no component matched'))
      }
      // 给context赋值meta信息
      context.meta = app.$meta()
      resolve(app)
    })
  })
}

import VueRouter from 'vue-router'
import routes from './routes'

//
export default () => {
  return new VueRouter({
    mode: 'history',
    // base: '/base/',
    routes,

    linkActiveClass: 'active-link', // router-link 标签激活后的class样式名称 /login
    linkExactActiveClass: 'exact-active-link',// router-link 标签激活后的class全路径 /login/exact

    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
      // 返回当前页面保留滚动的位置
      if (savedPosition) {
        return savedPosition
      } else {
        // 滚动到最上面
        // return {x: 0, y: 0}

        return new Promise((resolve, reject) => { // 异步滚动
          setTimeout(()=>{
            resolve({x: 0, y: 0})
          },500)
        })
      }
    },
    fallback: true,
    // parseQuery() {
    //
    // },url.havefun.im/u/Dkunv5
    // stringifyQuery() {
    //
    // },
  })
}

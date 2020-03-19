import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'
import createRouter from './config/router'
import './assets/styles/global.styl'

const router = createRouter()

Vue.use(VueRouter)

// 创建一个div ,
// 有了HtmlWebpackPlugin({template:}) 之后可以不用创建root的div
// const root = document.createElement('div')
// document.body.append(root)


const vm = new Vue({
  render: (h) => h(App),
  router
})
// 将div 挂载到 rootDiv上
vm.$mount('#root') // template.html的 div#root

import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import App from './app.vue'
import createRouter from './config/router'
import createStore from './store/store'
import './assets/styles/global.styl'





// use plugin
Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()

const vm = new Vue({
  render: (h) => h(App),
  router,
  store,
})
// 将div 挂载到 rootDiv上
vm.$mount('#root') // template.html的 div#root

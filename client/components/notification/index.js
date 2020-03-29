import Notification from './notification.vue'
import notify from './function'

// PluginFunction<T> = (Vue: typeof _Vue, options?: T) => void;
export default (Vue) => {
  // 全局注册
  Vue.component(Notification.name, Notification)
  Vue.prototype.$notify = notify
}


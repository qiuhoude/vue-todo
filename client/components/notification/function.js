import Vue from 'vue'
import Component from './func-notification'

// 扩展组件
const NotificationConstructor = Vue.extend(Component)


const instances = [] // 所有实例
let seed = 0 //自增id
const removeInstance = (instance) => {
  if (!instance) {
    return
  }
  const len = instances.length
  const index = instances.findIndex((ins) => ins.id === instance.id)
  instances.splice(index, 1)

  // 动态调整在上面的位置距离
  const removeHeight = instance.height
  for (let i = index; i < len - 1; i++) {
    instances[i].verticalOffset =
      Number.parseInt(instances[i].verticalOffset) - removeHeight - 16
    // console.log(`动态调整  ${instances[i].id} `)
  }
}
const notify = (options) => {
  if (Vue.prototype.$isServer) { //如果是服务端就不执行
    return
  }
  // 参数解构
  const {autoClose, ...rest} = options

  // 创建组件
  const instance = new NotificationConstructor({
    propsData: {
      ...rest,
    },
    data: {
      autoClose: autoClose === undefined ? 3000 : autoClose
    }
  })

  instance.id = `notification_${++seed}`
  instance.vm = instance.$mount()
  document.body.appendChild(instance.$el) //挂载到body下
  instance.visible = true

  // 计算距离底部距离
  let verticalOffset = 16
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  instance.verticalOffset = verticalOffset
  // 销毁操作
  instance.vm.$on('close', () => {
    console.log('instance.vm.$on ...')
    instance.vm.visible = false //点击紧急只是隐藏
  })
  instance.vm.$on('closed', () => {// 过渡结束销毁
    // 数组中移除
    removeInstance(instance)
    document.body.removeChild(instance.vm.$el) // 移除dom节点
    //完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。
    instance.vm.$destroy()    // 但不会移除dom节点
  })

  // 添加到数组中
  instances.push(instance)
  return instance.vm
}


export default notify

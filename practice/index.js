import Vue from 'vue'


//
// const vm = new Vue({
//   render: (h) => h(App)
// })
// // 将div 挂载到 rootDiv上
// vm.$mount(root)

// 创建一个div
const root = document.createElement('div')
document.body.append(root)
let vm = new Vue({
  el: root,
  template: "<div>hi~~~</div>"
});
vm.$mount(root)

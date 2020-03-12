import Vue from 'vue';
import App from './app.vue';

import './assets/styles/global.styl'

//创建一个div
const root = document.createElement('div');
document.body.append(root);


let vm = new Vue({
    render: (h) => h(App)
});
// 将div 挂载到 rootDiv上
vm.$mount(root);
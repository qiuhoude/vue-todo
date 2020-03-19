
export default [
  {
    path: '/',
    redirect: '/app' // 重定向
  },
  {
    path: '/app',
    component: ()=>import('../views/todo/todo.vue')
  },
  {
    path: '/login',
    component: ()=>import('../views/login/login.vue')
  }
]

export default [
  {
    path: '/',
    redirect: '/app' // 重定向
  },
  {
    path: '/app',
    name: 'app', //路由命名
    component: () => import('../views/todo/todo.vue'),
    meta: {
      title: 'this is app',
      description: '测试desc~~',
    },
    beforeEnter: (to, from, next) => {
      console.log('app route before enter')
      next() // 需要调用next传到下一个钩子
    }

    // children: [
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  }
]

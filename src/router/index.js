import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
// @表示src的行对路径
import Welcome from '@/views/Home/Welcome.vue'
import Users from '@/views/Home/Users.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/home/welcome',
    children: [
      {
        path: '/home/welcome',
        component: Welcome
      },
      {
        path: '/home/users',
        component: Users
      }
    ]
  },
  {
    path: '/',
    redirect: '/login'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 挂载路由导航守卫
/**
 * to: 将要访问的路径的对象
 * from: 代表当前路径,即从那个路径来
 * next: 是一个函数,执行可以放行
 */
router.beforeEach((to, from, next) => {
  const token = window.sessionStorage.getItem('token')
  if (to.path === '/login') {
    // 如果访问的登录页面,则直接放行,不许呀拦截
    return next()
  }
  if (!token) {
    // 代表没有登录,跳转到登录页面
    return next('/login')
  } else {
    next()
  }
})

export default router

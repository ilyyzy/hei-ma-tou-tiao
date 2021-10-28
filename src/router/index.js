import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入页面组件
import Login from '@/views/Login'
import Main from '@/views/Main'
import Home from '@/views/Home'
import User from '@/views/User'
import store from '@/store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login,
    name: 'login'
  },
  {
    path: '/',
    component: Main,
    children: [
      {
        path: '/',
        component: Home,
        name: 'home'
      },
      {
        path: '/user',
        component: User,
        name: 'user'
      }
    ]
  }
]
const pagePathArr = ['/user', '/user/edit']

// 为路由的实例对象挂载全局前置守卫
const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // 访问的是有权限的页面，需要判断用户是否登录
  if (pagePathArr.indexOf(to.path) !== -1) {
    // 1. 从 store 中获取 token 的值
    //    注意：store.state.tokenInfo 要么是 {} 空对象，要么是包含 {token, refresh_token} 的对象
    const tokenStr = store.state.tokenInfo.token
    if (tokenStr) {
      // 1.1 token 有值，已登录过（操作：直接放行）
      next()
    } else {
      // 1.2 token 不存在，没有登录（操作：强制跳转到登录页）
      next('/login')
    }
  } else {
    // 访问的是没有权限的页面
    next()
  }
})
const originalPush = VueRouter.prototype.push
// 2. 自定义 $router.push 方法，在内部调用原生的 originalPush 方法进行路由跳转；并通过 .catch 捕获错误
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  // 通过 .catch 捕获错误
  return originalPush.call(this, location).catch(err => err)
}

export default router

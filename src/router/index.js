import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入页面组件
import Login from '@/views/Login'
import Main from '@/views/Main'
import Home from '@/views/Home'
import User from '@/views/User'
import Search from '@/views/Search/Search'
import SearchResult from '@/views/SearchResult/SearchResult'
import ArticleDetail from '@/views/ArticleDetail'

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
      },
      {
        path: '/search',
        component: Search,
        name: 'search'
      },
      {
        path: '/search/:kw',
        component: SearchResult,
        name: 'SearchResult',
        props: true
      },
      {
        path: '/article/:id',
        component: ArticleDetail,
        name: 'ArticleDetail',
        props: true
      }
    ]
  }
]

const router = new VueRouter({
  mods: 'history',
  routes
})

export default router

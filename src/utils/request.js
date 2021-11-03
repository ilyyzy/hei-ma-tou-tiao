import axios from 'axios'
import { Toast } from 'vant'
import router from '../router'

// 导入vuex的store文件
import store from '../store'
// 调用 axios.create() 方法，创建 axios 的实例对象
const instance = axios.create({
  // 请求根路径
  // baseURL: 'http://www.liulongbin.top:8000'
  baseURL: 'http://geek.itheima.net'
})

// 添加请求拦截器
instance.interceptors.request.use(function(config) {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0
  })

  const tokenStr = store.state.tokenInfo.token
  if (tokenStr) {
    config.headers.Authorization = 'Bearer ' + tokenStr
  }
  return config
}, function(error) {
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function(response) {
  // 手动删除Toast
  Toast.clear()
  return response
}, function(error) {
  console.log(error.response, 'error.response')
  // 判断响应信息是否过期 (删除token 跳转登录页)
  if (error.response && error.response.status === 401) {
    store.commit('clearTokenInfo')
    // 强制跳转到登录页
    // console.log(router.currentRoute.fullPath)
    router.push('/login?url=' + 'user')
  }
  // 清除 加载中
  Toast.clear()
  return Promise.reject(error)
})

export default instance

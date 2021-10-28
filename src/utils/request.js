import axios from 'axios'
import { Toast } from 'vant'
// 导入vuex的store文件
import store from '../store/index'
import { exchangeTokenAPI } from '@/api/userAPI.js'
import router from '../router/index'
// import router from '@/router/index.js'

// 调用 axios.create() 方法，创建 axios 的实例对象
const instance = axios.create({
  // 请求根路径
  baseURL: 'http://toutiao.itheima.net'
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
instance.interceptors.response.use(

  response => {
    // 隐藏 loading 提示效果
    Toast.clear()
    return response
  },
  async error => {
    Toast.clear()

    // 1. 从 vuex 中获取 tokenInfo 对象，格式为： { token, refresh_token }
    const tokenInfo = store.state.tokenInfo
    // 2. 判断是否为 token 过期
    if (error.response && error.response.status === 401 && tokenInfo.refresh_token) {
      // token 过期
      console.log('token过期啦')

      try {
        // 3.1 TODO: 发起请求，根据 refresh_token 重新请求一个有效的新 token
        const { data: res } = await exchangeTokenAPI(tokenInfo.refresh_token)

        // 3.2 TODO: 更新 Store 中的 Token
        store.commit('updateTokenInfo', { token: res.data.token, refresh_token: tokenInfo.refresh_token })

        // 3.3 重新调用刚才“请求未遂”的接口
        // 3.3.1 如果在响应拦截器中 return 一个新的 Promise 异步请求，则会把这次请求的结果，当作上次请求的返回值
        return instance(error.config)
      } catch {
        //  token 和 refresh_token 都失效了

        // 4.1 清空 vuex 和 localStorage
        store.commit('cleanState')
        // 4.2 强制跳转到登录页
        router.replace('/login?pre=' + router.currentRoute.fullPath)
      }
    }
    return Promise.reject(error)
  }
)

export default instance

import Vue from 'vue'
import Vuex from 'vuex'

import { getUserInfoAPI } from '@/api/userAPI.js'

Vue.use(Vuex)

const initState = {
  // token 的信息对象
  tokenInfo: {
    token: '',
    refresh_token: ''
  },
  // 用户的基本信息
  userInfo: {}
}

const stateStr = window.localStorage.getItem('state')

if (stateStr !== null) {
  initState.tokenInfo = JSON.parse(stateStr).tokenInfo
}

export default new Vuex.Store({
  state: {
    tokenInfo: initState.tokenInfo,
    userInfo: initState.userInfo
  },
  mutations: {
    updateTokenInfo(state, payload) {
      state.tokenInfo = payload
      this.commit('saveStateStorage')
    },
    updateUserInfo(state, payload) {
      state.userInfo = payload
      this.commit('saveStateStorage')
    },
    // 获取token信息，存储到localstorage中
    saveStateStorage(state) {
      window.localStorage.setItem('state', JSON.stringify(state))
    },
    // 清除tokeninfo localstorage中的token
    clearTokenInfo(state) {
      state.tokenInfo = {
        token: '',
        refresh_token: ''
      }

      localStorage.removeItem('state')
    }
  },
  actions: {
    // 初始化用户的基本信息
    async initUserInfo(ctx) {
      // 调用 API 接口
      const { data: res } = await getUserInfoAPI()
      if (res.message === 'OK') {
        // TODO：把数据转交给 Mutation 方法   ctx.commit('Mutation方法名')
        ctx.commit('updateUserInfo', res.data)
        // console.log(res, '用户信息')
      }
    }
  },
  modules: {
  }
})

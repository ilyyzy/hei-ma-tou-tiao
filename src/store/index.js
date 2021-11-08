import Vue from 'vue'
import Vuex from 'vuex'

import { getUserInfoAPI, getUserProfileAPI } from '@/api/userAPI.js'

Vue.use(Vuex)

const initState = {
  // token 的信息对象
  tokenInfo: {
    token: '',
    refresh_token: ''
  },
  // 用户的基本信息
  userInfo: {},
  userProfile: {}
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
    },
    cleanState(state) {
      // 1. 清空 vuex 中的数据
      state.tokenInfo = {}
      state.userInfo = {}
      state.userProfile = {}

      // 2. 将清空后的 state 存储到本地
      this.commit('saveStateToStorage')
    },
    updateUserProfile(state, payload) {
      state.userProfile = payload
      this.commit('saveStateToStorage')
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
    },
    async initUserProfile(ctx) {
      // 调用 API 接口
      const { data: res } = await getUserProfileAPI()
      if (res.message === 'OK') {
        // TODO：把请求到的数据转交给 Mutation 方法   ctx.commit('Mutation方法名')
        ctx.commit('updateUserProfile', res.data)
      }
    }
  },
  modules: {
  }
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const initState = {
  tokenInfo: {
    token: '',
    refresh_token: ''
  }
}

const stateStr = window.localStorage.getItem('state')

if (stateStr !== null) {
  initState.tokenInfo = JSON.parse(stateStr).tokenInfo
}

export default new Vuex.Store({
  state: {
    tokenInfo: initState.tokenInfo
  },
  mutations: {
    updateTokenInfo(state, payload) {
      state.tokenInfo = payload
      this.commit('saveStateStorage')
    },
    saveStateStorage(state) {
      window.localStorage.setItem('state', JSON.stringify(state))
    }
  },
  actions: {
  },
  modules: {
  }
})

import { getToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken(),
  userInfo: sessionStorage.getItem('userInfo'),
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERINFO: (state, userInfo) => {
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
    state.userInfo = userInfo
  }
}

const actions = {
  setUserInfo({ commit }, userInfo) {
    commit('SET_USERINFO', userInfo)
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      sessionStorage.setItem('userInfo', '')
      sessionStorage.setItem('menuTree', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


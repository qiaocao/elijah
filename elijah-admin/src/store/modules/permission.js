import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(menuTree, route) {
  if (route.meta && route.meta.roles) {
    return menuTree.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, menuTree) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }

    if (menuTree !== null && !(menuTree.indexOf(tmp.children[0].name) < 0)) {
      // if (tmp.children) {
      //   tmp.children = filterAsyncRoutes(tmp.children, menuTree)
      // }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: constantRoutes,
  addRoutes: [],
  menuTree: sessionStorage.getItem('menuTree')
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_MENUTREE: (state, menutree) => {
    sessionStorage.setItem('menuTree', menutree)
    state.menuTree = sessionStorage.getItem('menuTree')
  },
  REMOVE_ROUTES: (state) => {
    state.addRoutes = []
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    // commit('SET_ROUTES', asyncRoutes)
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, state.menuTree)

      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  setMenuTree({ commit }, menuarray) {
    // commit('SET_ROUTES', asyncRoutes)
    const menuTree = []
    for (const mi of menuarray) {
      menuTree.push(mi.MenuName)
    }
    commit('SET_MENUTREE', menuTree)
  },
  removeRoutes({ commit }) {
    commit('REMOVE_ROUTES')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

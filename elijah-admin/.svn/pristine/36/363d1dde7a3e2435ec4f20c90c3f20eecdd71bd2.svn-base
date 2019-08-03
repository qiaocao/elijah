import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // 登录
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',

    component: () => import('@/views/404'),
    hidden: true
  }
  // 首页
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       name: 'Dashboard',
  //       component: () => import('@/views/dashboard/index'),
  //       meta: { title: '首页', icon: 'dashboard', affix: true }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/dashboard', hidden: true }
]

export const asyncRoutes = [
  // 部门管理
  {
    path: '/deptManage',
    component: Layout,
    children: [
      {
        path: '',
        name: 'DeptManage',
        component: () => import('@/views/deptManage/index'),
        meta: { title: '部门管理', icon: 'deptManage' }
      }

    ]
  },
  // 角色权限
  {
    path: '/roleManage',
    component: Layout,
    children: [
      {
        path: '',
        name: 'RoleManage',
        component: () => import('@/views/roleManage/index'),
        meta: { title: '权限管理', icon: 'roleManage' }
      }
    ]
  },
  // 警员注册
  {
    path: '/policeReg',
    component: Layout,
    children: [
      {
        path: '',
        name: 'PoliceReg',
        component: () => import('@/views/policeReg/index'),
        meta: { title: '警员注册', icon: 'policeReg' }
      }
    ]
  },
  // 电子围栏设置
  {
    path: '/elecFence',
    component: Layout,
    children: [
      {
        path: '',
        name: 'ElecFence',
        component: () => import('@/views/elecFence/index'),
        meta: { title: '电子围栏设置', icon: 'elecFence' }
      }
    ]
  },
  // 设备管理
  {
    path: '/deviceManage',
    component: Layout,
    children: [
      {
        path: '',
        name: 'DeviceManage',
        component: () => import('@/views/deviceManage/index'),
        meta: { title: '设备管理', icon: 'deviceManage' }
      }
    ]
  },
  // 黑名单管理
  {
    path: '/blacklist',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Blacklist',
        component: () => import('@/views/blacklist/index'),
        meta: { title: '黑名单管理', icon: 'blacklist' }
      }
    ]
  },
  // 参数设置
  {
    path: '/paramSet',
    component: Layout,
    children: [
      {
        path: '',
        name: 'ParamSet',
        component: () => import('@/views/paramSet/index'),
        meta: { title: '参数设置', icon: 'paramSet' }
      }
    ]
  },
  {
    path: '/dataDict',
    component: Layout,
    children: [
      {
        path: '',
        name: 'DataDict',
        component: () => import('@/views/dataDict/index'),
        meta: { title: '违法类型', icon: 'dataDict' }
      }

    ]
  }]
const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

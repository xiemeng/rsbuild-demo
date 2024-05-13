// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout, RouteView, FixedLayout } from '@/layouts'
import {
  clientBaseOperation,
  customerConversion,
  corporateRiskControl,
  businessAdmin,
  marketingCenter,
  friendsCircle,
} from '@/core/icons'

function IsPhone() {
  //获取浏览器navigator对象的userAgent属性（浏览器用于HTTP请求的用户代理头的值）
  var info = navigator.userAgent
  //通过正则表达式的test方法判断是否包含“Mobile”字符串
  var isPhone = /mobile/i.test(info)
  //如果包含“Mobile”（是手机设备）则返回true
  return isPhone
}
let component = ''
if (IsPhone()) {
  component = BasicLayout
} else {
  component = FixedLayout
}
export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: component,
    meta: { title: ENTERPRICE_NAME, keepAlive: true },
    redirect: '/home',
    children: [
      //首页
      {
        path: '/home',
        name: 'Home',
        redirect: '/home',
        component: RouteView,
        meta: { title: '首页', icon: 'home' },
        children: [
          {
            path: '/home',
            name: 'Home',
            component: () => import('@/views/home/index.vue'),
            meta: { title: '首页' },
          },
        ],
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register'),
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult'),
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/exception/404'),
  },
]

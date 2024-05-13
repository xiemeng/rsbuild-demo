import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from '@/config/router.config'

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: constantRouterMap,
  // 解决keep-alive切换页面，高度复用的问题，需要在子页面加state，query参数
  scrollBehavior(to, form, savedPosition) {
    if (to.query.state) {
      return { x: 0, y: 0 }
    } else {
      return savedPosition
    }
  }
})

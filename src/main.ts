// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from './locales'
import { VueAxios } from './utils/request'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import themePluginConfig from '../config/themePluginConfig'
import 'ant-design-vue/dist/antd.css'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard);
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
Vue.prototype.$EventBus = new Vue();
import { Tree, TreeSelect, Collapse, Transfer, Pagination, Empty, FormModel, Calendar, Anchor, Carousel, Cascader ,Rate, } from 'ant-design-vue'
// 引入时间控件, 使用方法  this.$moment
import moment from 'moment'
Vue.prototype.$moment = moment
Vue.prototype.ENTERPRICE_NAME = ENTERPRICE_NAME
// 引入 vue-infinite-scroll 实现滚动无限加载长列表，有虚拟滚动功能，能够提高数据量大时长列表性能  采用局部引入


// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
import './mock'

import bootstrap from './core/bootstrap'
import './core/lazy_use' // use lazy load components
import './permission' // permission control
import './utils/filter' // global filter
import './global.less' // global style
Vue.filter('cnFormatter', function (val) {
  const num = 10000
  var sizesValue = ''
  /**
   * 判断取哪个单位
   */
  if (val < 1000) {
    // 如果小于1000则直接返回
    sizesValue = ''
    return val
  } else if (val > 1000 && val < 9999) {
  } else if (val > 10000 && val < 99999999) {
    sizesValue = '万'
  } else if (val > 100000000) {
    sizesValue = '亿'
  }
  /**
   * 大于一万则运行下方计算
   */
  const i = Math.floor(Math.log(val) / Math.log(num))
  /**
   * toFixed(0)看你们后面想要取值多少，我是不取所以填了0，一般都是取2个值
   */
  var sizes = (val / Math.pow(num, i)).toFixed(2)
  sizes = sizes + sizesValue
  return sizes
})
Vue.filter('cnFormatter', function (val) {
  if(!val){
    return 0
  }
  const num = 10000
  var sizesValue = ''
  /**
   * 判断取哪个单位
   */
  if (val < 1000) {
    // 如果小于1000则直接返回
    sizesValue = ''
    return val
  } else if (val > 1000 && val < 9999) {
  } else if (val > 10000 && val < 99999999) {
    sizesValue = 'W'
  } else if (val > 100000000) {
    sizesValue = '亿'
  }
  /**
   * 大于一万则运行下方计算
   */
  const i = Math.floor(Math.log(val) / Math.log(num))
  /**
   * toFixed(0)看你们后面想要取值多少，我是不取所以填了0，一般都是取2个值
   */
  var sizes = (val / Math.pow(num, i)).toFixed(2)
  sizes = sizes + sizesValue
  return sizes
})
Vue.config.productionTip = false

// mount axios to `Vue.$http` and `this.$http`
Vue.use(VueAxios)
Vue.use(Anchor)
Vue.use(Cascader)
Vue.use(Tree)
Vue.use(Calendar)
Vue.use(Collapse)
Vue.use(Transfer)
Vue.use(Pagination)
Vue.use(TreeSelect)
Vue.use(Empty)
Vue.use(Carousel)
Vue.use(FormModel)
Vue.use(Rate)
// use pro-layout components
Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)

window.umi_plugin_ant_themeVar = themePluginConfig.theme

new Vue({
  router,
  store,
  i18n,
  // init localstorage, vuex
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
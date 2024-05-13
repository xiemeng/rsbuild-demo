import axios from 'axios'
import store from '@/store'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { isBlob } from '@/utils/util'
// 创建 axios 实例
console.log(process.env.NODE_ENV)
let baseURL = ''
if (process.env.NODE_ENV === 'development') {
  baseURL = DEV_VUE_APP_API_BASE_URL
} else {
  baseURL = PRD_VUE_APP_API_BASE_URL
}
const request = axios.create({
  // API 请求的默认前缀
  baseURL: baseURL,
  timeout: 60000, // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    const data = error.response.data
    // 从 localstorage 获取 token
    const token = storage.get(ACCESS_TOKEN)
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
      throw '请重新登录'
    }

    throw error.response.data.message || error.response.data.error || error.response.data.msg
  } else {
    notification.error({
      message: '数据请求失败',
      description: error.message,
    })
  }
  console.log(error)
  return Promise.reject(error)
}
// request interceptor
request.interceptors.request.use((config) => {
  const token = storage.get(ACCESS_TOKEN)
  const corpId = storage.get('corpId')
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['id_token'] = token
  }
  if (corpId) {
    config.headers['corpId'] = corpId
  }
  return config
}, errorHandler)
// response interceptor
request.interceptors.response.use((response) => {
  // 下载用 需要设置请求头为 responseType: 'blob'
  if (isBlob(response.data)) {
    return response.data
  }
  if (response.data?.statusCode === 0) {
    return response.data
  } else {
    throw response.data.msg || response.data.error
  }
}, errorHandler)
const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, request)
  },
}
export default request
export { installer as VueAxios, request as axios }

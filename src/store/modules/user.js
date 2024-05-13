import storage from 'store'
import { login, getInfo, logout } from '@/api/login2'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
import { info } from './mock'
const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    live: {}, // 直播相关信息
    corp: {}, // 公司信息
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_CORP: (state, corp) => {
      state.corp = corp
    },
    SET_LIVE: (state, live) => {
      console.log(live)
      state.live = live
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          console.log(response)
          const result = response.data
          storage.set(ACCESS_TOKEN, result.id_token, 7 * 24 * 60 * 60 * 1000)
          storage.set('corpId', result.corpId, 7 * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', result.id_token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          if (res.data) {
            const result = res.data
            result.role = info.role
            result.role.permissions = res.data.permission
            if (result.role && result.role?.permissions?.length > 0) {
              const role = result.role
              role.permissions = result.role.permissions
              const permissionList = []
              role.permissions.forEach(element => {
                element?.children?.forEach(item => {
                  permissionList.push(item.name)
                })
                permissionList.push(element.name)
              });
              role.permissionList = permissionList
              commit('SET_ROLES', result.role)
              commit('SET_INFO', result.user)
              console.log(result)
              commit('SET_LIVE', {
                zhifu: result.zhifu,
                zhibo: result.zhibo,
                kefu: result.kefu
              })
              commit('SET_CORP', result.corp)
            } else {
              reject(new Error('没有使用权限，请联系管理员添加权限'))
            }
            commit('SET_NAME', { name: result.user.name, welcome: welcome() })
            commit('SET_AVATAR', result.user.avatar)
            resolve(result)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          storage.remove(ACCESS_TOKEN)
          storage.remove('corpId')
          resolve()
        }).catch(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          storage.remove(ACCESS_TOKEN)
          storage.remove('corpId')
          resolve()
        }).finally(() => { })
      })
    }

  }
}

export default user

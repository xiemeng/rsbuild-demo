// 正式数据，后面替代login.js 改名
import request from '@/utils/request'

const userApi = {
  login: '/authority/login/verify', // 验证loginId
  userInfo: '/authority/login/admin', // 获取登入用户
  logout: '/authority/login/delete', // 退出登入
  getAuthCode: '/authority/install/config/getAuthCode', // 获取临时授权码  企业微信授权
  save: '/authority/install/config/save', // 新增配置企业
  getUrl: '/enterprise/thirdPart/getUrl', // 三方获取授权url
  thirdPartList: '/enterprise/thirdPart/list', // 查看绑定公众号列表
  thirdPartUpdate: '/enterprise//thirdPart/update', // 更新授权状态
}

export function login(parameter) {
  return request({
    url: userApi.login,
    method: 'get',
    params: parameter
  })
}

export function logout(parameter) {
  return request({
    url: userApi.logout,
    method: 'get',
    params: parameter
  })
}

export function getInfo(parameter) {
  return request({
    url: userApi.userInfo,
    method: 'get',
    params: parameter
  })
}

export function getAuthCode(parameter) {
  return request({
    url: userApi.getAuthCode,
    method: 'post',
    data: parameter
  })
}

export function save(parameter) {
  return request({
    url: userApi.save,
    method: 'post',
    data: parameter
  })
}

export function getUrl(parameter) {
  return request({
    url: userApi.getUrl,
    method: 'post',
    data: parameter
  })
}

export function thirdPartList(parameter) {
  return request({
    url: userApi.thirdPartList,
    method: 'get',
    params: parameter
  })
}

export function thirdPartUpdate(parameter) {
  return request({
    url: userApi.thirdPartUpdate,
    method: 'get',
    params: parameter
  })
}
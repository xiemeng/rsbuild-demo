import request from '@/utils/request'

const baseApi = {
  tencentDocSettingPage: '/enterprise/tencentDocSetting/page', // 分页查询
  addDoc: '/enterprise/tencentDocSetting/addDoc', // 配置腾讯文档
  deleteDoc: '/enterprise/tencentDocSetting/deleteDoc', // 删除腾讯文档配置
  updateDoc: '/enterprise/tencentDocSetting/updateDoc', // 修改腾讯文档配置
  refreshAccessToken: '/enterprise/tencentDocSetting/refreshAccessToken', // 生成腾讯文档AccessToken
  syncTencentDoc: '/enterprise/tencentDocSetting/syncTencentDoc', // 生成腾讯文档AccessToken
}

export function tencentDocSettingPage(parameter) {
  return request({
    url: baseApi.tencentDocSettingPage,
    method: 'post',
    data: parameter,
  })
}

export function addDoc(parameter) {
  return request({
    url: baseApi.addDoc,
    method: 'post',
    data: parameter,
  })
}

export function deleteDoc(parameter) {
  return request({
    url: baseApi.deleteDoc,
    method: 'post',
    data: parameter,
  })
}

export function updateDoc(parameter) {
  return request({
    url: baseApi.updateDoc,
    method: 'post',
    data: parameter,
  })
}

export function refreshAccessToken(parameter) {
  return request({
    url: baseApi.refreshAccessToken,
    method: 'post',
    data: parameter,
  })
}

export function syncTencentDoc(parameter) {
  return request({
    url: baseApi.syncTencentDoc,
    method: 'post',
    data: parameter,
  })
}
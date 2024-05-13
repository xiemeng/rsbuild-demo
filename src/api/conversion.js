import request from '@/utils/request'

const conversionApi = {
  syncUpdate: `/client_transformation/oss/syncArticle`, //同步更新
  getOfficialAccount: `/client_transformation/oss/getPublicAccount`, // 查询公众号
  getLastSyncTime: `/client_transformation/oss/getLastSyncTime`, // 查询上一次同步时间

  upload: '/client_transformation/oss/upload', // 添加素材  client_teansformation,
  update: '/client_transformation/oss/update', // 更新素材
  materialList: '/client_transformation/oss/page', // 查询素材列表
  deleteMaterial: '/client_transformation/oss/delete', // 删除素材列表
  addTag: '/client_transformation/materialTag/add', // 添加素材标签
  deleteTag: '/client_transformation/materialTag/delete', // 删除素材标签
  tagList: '/client_transformation/materialTag/page', // 查询素材标签列表
  updateTag: '/client_transformation/materialTag/update', // 更新素材标签

  addWelcome: '/client_transformation/welcome/add', // 添加欢迎语
  listWelcome: '/client_transformation/welcome/page', // 添加欢迎语
  delWelcome: '/client_transformation/welcome/delWelcome', // 删除欢迎语
  detailWelcome: '/client_transformation/welcome/detail', // 查询欢迎语详情
  updateWelcome: '/client_transformation/welcome/update', // 更新欢迎语

  addCustomerSend: '/client_transformation/customerSend/add', // 添加客户群发
  delCustomerSend: '/client_transformation/customerSend/delete', // 删除客户群发
  pageCustomerSend: '/client_transformation/customerSend/page', // 查询客户群发列表
  upDateCustomerSend: '/client_transformation/customerSend/update', // 更新客户群发

  addSersonSop: '/client_transformation/personSop/add', // 新增个人sop
  delGroupSop: '/client_transformation/personSop/delGroupSop', // 删除个人sop
  detailPersonSop: '/client_transformation/personSop/detail', // 查询个人sop详情
  pagePersonSop: '/client_transformation/personSop/page', // 查询个人sop列表
  setPersonSopStaff: '/client_transformation/personSop/setPersonSopStaff', // 设置客服
  updatePersonSop: '/client_transformation/personSop/update', // 更新个人sop
  updateStatus: '/client_transformation/personSop/updateStatus', // 修改开关

  interactiveRadarUploadFile: '/client_group/upload/uploadFile', // 上传文件到阿里云
  uploadMedia: '/client_group/upload/uploadMedia', // 上传文件到企业微信 旧
  channelCodeUploadFile: '/channel/channelCode/uploadFile', // 上传文件到企业微信 新
}

/**
 * 查询上一次同步时间
 * @param {*} parameter
 * @returns
 */
export function getServiceLastSyncTime(parameter) {
  return request({
    url: conversionApi.getLastSyncTime,
    method: 'get',
    params: parameter,
  })
}
/**
 * 同步更新
 * @param {*} parameter
 * @returns
 */
export function syncServiceUpdate(parameter) {
  return request({
    url: conversionApi.syncUpdate,
    method: 'get',
    params: parameter,
  })
}
/**
 * 查询公众号
 * @param {*} parameter
 * @returns
 */
export function getServiceOfficialAccount(parameter) {
  return request({
    url: conversionApi.getOfficialAccount,
    method: 'get',
    params: parameter,
  })
}

export function interactiveRadarUploadFile(parameter) {
  return request({
    url: conversionApi.interactiveRadarUploadFile,
    method: 'post',
    data: parameter,
  })
}

export function addSersonSop(parameter) {
  return request({
    url: conversionApi.addSersonSop,
    method: 'post',
    data: parameter,
  })
}

export function delGroupSop(parameter) {
  return request({
    url: conversionApi.delGroupSop,
    method: 'post',
    params: parameter,
  })
}

export function detailPersonSop(parameter) {
  return request({
    url: conversionApi.detailPersonSop,
    method: 'get',
    params: parameter,
  })
}

export function pagePersonSop(parameter) {
  return request({
    url: conversionApi.pagePersonSop,
    method: 'get',
    params: parameter,
  })
}

export function setPersonSopStaff(parameter) {
  return request({
    url: conversionApi.setPersonSopStaff,
    method: 'post',
    data: parameter,
  })
}

export function updatePersonSop(parameter) {
  return request({
    url: conversionApi.updatePersonSop,
    method: 'post',
    data: parameter,
  })
}

export function updateStatus(parameter) {
  return request({
    url: conversionApi.updateStatus,
    method: 'post',
    params: parameter,
  })
}

export function upload(parameter) {
  return request({
    url: conversionApi.upload,
    method: 'post',
    data: parameter,
  })
}
export function update(parameter) {
  return request({
    url: conversionApi.update,
    method: 'post',
    data: parameter,
  })
}
export function materialList(parameter) {
  return request({
    url: conversionApi.materialList,
    method: 'get',
    params: parameter,
  })
}
export function deleteMaterial(parameter) {
  return request({
    url: conversionApi.deleteMaterial,
    method: 'get',
    params: parameter,
  })
}
export function addTag(parameter) {
  return request({
    url: conversionApi.addTag,
    method: 'post',
    data: parameter,
  })
}

export function deleteTag(parameter) {
  return request({
    url: conversionApi.deleteTag,
    method: 'get',
    params: parameter,
  })
}

export function tagList(parameter) {
  return request({
    url: conversionApi.tagList,
    method: 'get',
    params: parameter,
  })
}

export function updateTag(parameter) {
  return request({
    url: conversionApi.updateTag,
    method: 'post',
    data: parameter,
  })
}

export function addWelcome(parameter) {
  return request({
    url: conversionApi.addWelcome,
    method: 'post',
    data: parameter,
  })
}

export function listWelcome(parameter) {
  return request({
    url: conversionApi.listWelcome,
    method: 'get',
    params: parameter,
  })
}

export function delWelcome(parameter) {
  return request({
    url: conversionApi.delWelcome,
    method: 'post',
    params: parameter,
  })
}

export function updateWelcome(parameter) {
  return request({
    url: conversionApi.updateWelcome,
    method: 'post',
    data: parameter,
  })
}

export function detailWelcome(parameter) {
  return request({
    url: conversionApi.detailWelcome,
    method: 'get',
    params: parameter,
  })
}

export function addCustomerSend(parameter) {
  return request({
    url: conversionApi.addCustomerSend,
    method: 'post',
    data: parameter,
  })
}

export function delCustomerSend(parameter) {
  return request({
    url: conversionApi.delCustomerSend,
    method: 'get',
    params: parameter,
  })
}

export function pageCustomerSend(parameter) {
  return request({
    url: conversionApi.pageCustomerSend,
    method: 'get',
    params: parameter,
  })
}

export function upDateCustomerSend(parameter) {
  return request({
    url: conversionApi.upDateCustomerSend,
    method: 'post',
    data: parameter,
  })
}

export function uploadMedia(parameter) {
  return request({
    url: conversionApi.uploadMedia,
    method: 'post',
    data: parameter,
  })
}
export function channelCodeUploadFile(parameter) {
  return request({
    url: conversionApi.channelCodeUploadFile,
    method: 'post',
    data: parameter,
  })
}
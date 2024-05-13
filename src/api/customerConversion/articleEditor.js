import request from '@/utils/request'

const costomApi = {
  uploadMaterial: '/client_transformation/oss/upload', // 新增素材
  getMaterialDetail: `/client_transformation/oss/info`, // 素材详情
  updateMaterial: `/client_transformation/oss/update`, // 修改素材
  uploadFile: `/client_group/upload/uploadFile`, // 上传文件到阿里云，得到阿里云地址
}

export function uploadServiceFile(parameter) {
  return request({
    url: costomApi.uploadFile,
    method: 'post',
    data: parameter,
  })
}

export function updateServiceMaterial(parameter) {
  return request({
    url: costomApi.updateMaterial,
    method: 'post',
    data: parameter,
  })
}

export function getServiceMaterialDetail(parameter) {
  return request({
    url: costomApi.getMaterialDetail,
    method: 'get',
    params: parameter,
  })
}

export function uploadServiceMaterial(parameter) {
  return request({
    url: costomApi.uploadMaterial,
    method: 'post',
    data: parameter,
  })
}
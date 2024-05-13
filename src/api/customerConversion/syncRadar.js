import request from '@/utils/request'

const conversionApi = {
  interactiveRadarAdd: '/client_transformation/interactradar/add', // 互动雷达-新增
  updateMaterial: `/client_transformation/oss/update` // 修改素材
}

export function interactiveRadarAdd(parameter) {
  return request({
    url: conversionApi.interactiveRadarAdd,
    method: 'post',
    data: parameter,
  })
}
export function updateMaterial(parameter) {
  return request({
    url: conversionApi.updateMaterial,
    method: 'post',
    data: parameter,
  })
}
import request from '@/utils/request'

const baseApi = {
  customerstatisticaldata: '/client_manager/customerstatisticaldata/get', // 客户统计以及客户折线图数据
  getgroupstatistics: '/client_group/customerGroup/getgroupstatistics', // 群数据统计
  getstaffcount: '/enterprise/staff/getstaffcount', //企业员工数量
  customerEvent: '/client_manager/customerEvent/list', //企业员工数量
}

export function customerstatisticaldata(parameter) {
  return request({
    url: baseApi.customerstatisticaldata,
    method: 'post',
    data: parameter,
  })
}

export function getgroupstatistics(parameter) {
  return request({
    url: baseApi.getgroupstatistics,
    method: 'get',
    params: parameter,
  })
}

export function getstaffcount(parameter) {
  return request({
    url: baseApi.getstaffcount,
    method: 'get',
    params: parameter,
  })
}

export function customerEvent(parameter) {
  return request({
    url: baseApi.customerEvent,
    method: 'post',
    data: parameter,
  })
}
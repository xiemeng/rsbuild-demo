import request from '@/utils/request'

const groupApi = {
    infoniteList: '/client_group/unlimitedPull/query', // 查询自动加群列表
    delGroupInfinte: '/client_group/unlimitedPull/delete', // 删除
    queryList: '/client_group/unlimitedPull/get', // 通过id查询列表
    addInfinite: '/client_group/unlimitedPull/add', // 添加
    updateInfinite: '/client_group/unlimitedPull/update', // 更新
}

export function addInfinite(parameter) {
    return request({
        url: groupApi.addInfinite,
        method: 'post',
        data: parameter,
    })
}

export function updateInfinite(parameter) {
    return request({
        url: groupApi.updateInfinite,
        method: 'post',
        data: parameter,
    })
}
export function infoniteList(parameter) {
    return request({
        url: groupApi.infoniteList,
        method: 'get',
        params: parameter,
    })
}

export function delGroupInfinte(parameter) {
    return request({
        url: groupApi.delGroupInfinte,
        method: 'get',
        params: parameter,
    })
}

export function queryList(parameter) {
    return request({
        url: groupApi.queryList,
        method: 'get',
        params: parameter,
    })
}
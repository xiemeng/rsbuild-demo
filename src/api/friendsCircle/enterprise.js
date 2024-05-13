import request from '@/utils/request'

const baseApi = {
    syncQw: '/moment/enterpriseMoment/syncQw', // 同步企业朋友圈记录
    checkSyncQwMoment: '/moment/enterpriseMoment/checkSyncQwMoment', // 检查同步企业朋友圈是否同步完成
    queryMomentSyncFlag: '/moment/enterpriseMoment/queryMomentSyncFlag', //查看可同步的企业朋友圈
    syncLocalMoment: '/moment/enterpriseMoment/syncLocalMoment', //企业朋友圈同步到本地
    getQwMomentList: '/moment/enterpriseMoment/getQwMomentList', //查看企业微信列表
    delLocalMoment: '/moment/enterpriseMoment/delLocalMoment', //删除本地朋友圈
    publishLocalMoment: '/moment/momentinfo/publishLocalMoment' //发表朋友圈
}

export function publishLocalMoment(parameter) {
    return request({
        url: baseApi.publishLocalMoment,
        method: 'post',
        data: parameter,
    })
}

export function delLocalMoment(parameter) {
    return request({
        url: baseApi.delLocalMoment,
        method: 'post',
        data: parameter,
    })
}

export function getQwMomentList(parameter) {
    return request({
        url: baseApi.getQwMomentList,
        method: 'post',
        data: parameter,
    })
}

export function syncQw(parameter) {
    return request({
        url: baseApi.syncQw,
        method: 'get',
        params: parameter,
    })
}

export function checkSyncQwMoment(parameter) {
    return request({
        url: baseApi.checkSyncQwMoment,
        method: 'get',
        params: parameter,
    })
}

export function queryMomentSyncFlag(parameter) {
    return request({
        url: baseApi.queryMomentSyncFlag,
        method: 'post',
        data: parameter,
    })
}

export function syncLocalMoment(parameter) {
    return request({
        url: baseApi.syncLocalMoment,
        method: 'post',
        data: parameter,
    })
}
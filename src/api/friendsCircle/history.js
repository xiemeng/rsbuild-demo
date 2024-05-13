import request from '@/utils/request'

const baseApi = {
    getHistoryMoment: '/moment/enterpriseMoment/getHistoryMoment', // 查看历史朋友圈
    queryMomentRule: '/moment/momentrule/queryMomentRule', // 查看朋友圈规则
    momentDetail: '/moment/momentinfo/momentDetail', //朋友圈详情
    createMomentRule: '/moment/momentrule/createMomentRule' //新增/更新朋友圈规则
}

export function momentDetail(parameter) {
    return request({
        url: baseApi.momentDetail,
        method: 'get',
        params: parameter,
    })
}

export function queryMomentRule(parameter) {
    return request({
        url: baseApi.queryMomentRule,
        method: 'get',
        params: parameter,
    })
}

export function getHistoryMoment(parameter) {
    return request({
        url: baseApi.getHistoryMoment,
        method: 'post',
        data: parameter,
    })
}

export function createMomentRule(parameter) {
    return request({
        url: baseApi.createMomentRule,
        method: 'post',
        data: parameter,
    })
}
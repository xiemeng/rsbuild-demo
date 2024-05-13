import request from '@/utils/request'

const apiList = {
    pointsSave: '/marketing/customerfraction/save', //添加规则
    pointsUpdate: '/marketing/customerfraction/update', //更新规则
    pointsDelete: '/marketing/customerfraction/delete', //删除规则
    pointsInfo: '/marketing/customerfraction/info/', //查询规则
    pointsList: '/marketing/customerfraction/list', //批量查询规则
    updateRuleStatus: '/marketing/customerfraction/updateRuleStatus', //更新规则状态
}

export function updateRuleStatus(parameter) {
    return request({
        url: apiList.updateRuleStatus,
        method: 'post',
        params: parameter,
    })
}

export function pointsList(parameter) {
    return request({
        url: apiList.pointsList,
        method: 'post',
        params: parameter,
    })
}

export function pointsInfo(parameter) {
    return request({
        url: apiList.pointsInfo + parameter,
        method: 'get',
    })
}

export function pointsSave(parameter) {
    return request({
        url: apiList.pointsSave,
        method: 'post',
        data: parameter,
    })
}

export function pointsUpdate(parameter) {
    return request({
        url: apiList.pointsUpdate,
        method: 'post',
        data: parameter,
    })
}

export function pointsDelete(parameter) {
    return request({
        url: apiList.pointsDelete,
        method: 'post',
        data: parameter,
    })
}
import request from '@/utils/request'

const groupApi = {
    labelGroupList: '/client_group/tagBuildGroup/page', // 标签建群列表
    labelGroupAdd: '/client_group/tagBuildGroup/add', // 添加标签建群
    labelGroupDel: '/client_group/tagBuildGroup/delGroupTagPull', // 删除标签建群
    getChat: '/client_group/tagBuildGroup/getChat', // 获取群信息
    getStatistics: '/client_group/tagBuildGroup/getStatistics', // 客户统计
    queryCustomers: '/client_group/tagBuildGroup/customer/get', // 查询客户
    customersDetail: '/client_group/tagBuildGroup/staff/get', //成员详情
    remind: '/client_group/tagBuildGroup/remind', //提醒员工
    calculateNum: '/client_group/tagBuildGroup/calculateNum', //查看预计人数
    updateDate: '/client_group/tagBuildGroup/getNewData', //更新数据
}

export function updateDate(parameter) {
    return request({
        url: groupApi.updateDate,
        method: 'get',
        params: parameter,
    })
}

export function getChat(parameter) {
    return request({
        url: groupApi.getChat,
        method: 'get',
        params: parameter,
    })
}

export function calculateNum(parameter) {
    return request({
        url: groupApi.calculateNum,
        method: 'post',
        data: parameter,
    })
}

export function remind(parameter) {
    return request({
        url: groupApi.remind,
        method: 'post',
        data: parameter,
    })
}

export function labelGroupList(parameter) {
    return request({
        url: groupApi.labelGroupList,
        method: 'get',
        params: parameter,
    })
}

export function labelGroupAdd(parameter) {
    return request({
        url: groupApi.labelGroupAdd,
        method: 'post',
        data: parameter,
    })
}

export function queryCustomers(parameter) {
    return request({
        url: groupApi.queryCustomers,
        method: 'post',
        data: parameter,
    })
}

export function customersDetail(parameter) {
    return request({
        url: groupApi.customersDetail,
        method: 'post',
        data: parameter,
    })
}

export function getStatistics(parameter) {
    return request({
        url: groupApi.getStatistics,
        method: 'get',
        params: parameter,
    })
}

export function labelGroupDel(parameter) {
    return request({
        url: groupApi.labelGroupDel,
        method: 'post',
        params: parameter,
    })
}
import request from '@/utils/request'

const channelCodeApi = {
    addList: '/channel/channelCode/add', // 新增渠道活码
    getPage: '/channel/channelCode/page', // 查询渠道活码列表
    deleteList: '/channel/channelCode/delete', // 删除渠道活码
    details: '/channel/channelCode/info', // 渠道活码详情
    updatePic: '/channel/channelCode/updatePic', //渠道活码更换头像
    updateList: '/channel/channelCode/update', //渠道活码更新
    batchDownload: '/channel/channelCode/batchDownload', //批量下载

    groupList: '/channel/channelcodegroup/list', //分组——列表
    groupSave: '/channel/channelcodegroup/save', //分组——新增
    groupDelete: '/channel/channelcodegroup/delete', //分组——删除
    groupUpdate: '/channel/channelcodegroup/update', //分组——修改
    batchGroups: '/channel/channelcodegroup/batchGroup', //批量分组

    getStaffStatistics: '/channel/channelCodeStatistics/getStaffStatistics', //客户数统计
    getData: '/channel/customerstatistics/getData', // 根据条件统计客户数
    getCompareData: '/channel/customerstatistics/getCompareData', // 对比数据——折线表数据
    exportForDate: '/channel/customerstatistics/exportForDate', // 根据日期统计导出
    exportForStaff: '/channel/customerstatistics/exportForStaff', // 导出——按员工统计列表
    totalInfo: '/channel/customerstatistics/totalInfo', // 客户总数（详情接口）
    addInfo: '/channel/customerstatistics/addInfo', // 新增总数（详情接口）
    lossInfo: '/channel/customerstatistics/lossInfo', //   流失总数（详情接口）
    getStaffStatisticsByCodes: '/channel/channelCodeStatistics/getStaffStatisticsByCodes', //   添加、流失客户统计(用于多个或单个数据统计)
    exportForInfoData: '/channel/customerstatistics/exportForInfoData', //   导出----详情数据导出 (不分页，全部导出)
}

export function exportForInfoData(parameter) {
    return request({
        url: channelCodeApi.exportForInfoData,
        method: 'post',
        data: parameter,
        responseType: 'blob'
    })
}

export function getStaffStatisticsByCodes(parameter) {
    return request({
        url: channelCodeApi.getStaffStatisticsByCodes,
        method: 'post',
        data: parameter,
    })
}
export function addInfo(parameter) {
    return request({
        url: channelCodeApi.addInfo,
        method: 'post',
        data: parameter,
    })
}
export function lossInfo(parameter) {
    return request({
        url: channelCodeApi.lossInfo,
        method: 'post',
        data: parameter,
    })
}
export function totalInfo(parameter) {
    return request({
        url: channelCodeApi.totalInfo,
        method: 'post',
        data: parameter,
    })
}
export function addList(parameter) {
    return request({
        url: channelCodeApi.addList,
        method: 'post',
        data: parameter,
    })
}
export function updateList(parameter) {
    return request({
        url: channelCodeApi.updateList,
        method: 'post',
        data: parameter,
    })
}
export function getPage(parameter) {
    return request({
        url: channelCodeApi.getPage,
        method: 'get',
        params: parameter,
    })
}

export function deleteList(parameter) {
    return request({
        url: channelCodeApi.deleteList,
        method: 'get',
        params: parameter,
    })
}

export function details(parameter) {
    return request({
        url: channelCodeApi.details,
        method: 'get',
        params: parameter,
    })
}

export function updatePic(parameter) {
    return request({
        url: channelCodeApi.updatePic,
        method: 'post',
        data: parameter,
    })
}

export function groupList(parameter) {
    return request({
        url: channelCodeApi.groupList,
        method: 'get',
        params: parameter,
    })
}

export function groupSave(parameter) {
    return request({
        url: channelCodeApi.groupSave,
        method: 'post',
        data: parameter,
    })
}

export function groupDelete(parameter) {
    return request({
        url: channelCodeApi.groupDelete,
        method: 'post',
        params: parameter,
    })
}

export function groupUpdate(parameter) {
    return request({
        url: channelCodeApi.groupUpdate,
        method: 'post',
        data: parameter,
    })
}

export function batchGroups(parameter) {
    return request({
        url: channelCodeApi.batchGroups,
        method: 'post',
        data: parameter,
    })
}

export function batchDownload(parameter) {
    return request({
        url: channelCodeApi.batchDownload,
        method: 'get',
        params: parameter,
        Headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        responseType: 'blob'
    })
}

export function getStaffStatistics(parameter) {
    return request({
        url: channelCodeApi.getStaffStatistics,
        method: 'post',
        data: parameter,
    })
}

export function getData(parameter) {
    return request({
        url: channelCodeApi.getData,
        method: 'post',
        data: parameter,
    })
}

export function getCompareData(parameter) {
    return request({
        url: channelCodeApi.getCompareData,
        method: 'post',
        data: parameter,
    })
}

export function exportForDate(parameter) {
    return request({
        url: channelCodeApi.exportForDate,
        method: 'post',
        data: parameter,
        responseType: 'blob'
    })
}
export function exportForStaff(parameter) {
    return request({
        url: channelCodeApi.exportForStaff,
        method: 'post',
        data: parameter,
        responseType: 'blob'
    })
}
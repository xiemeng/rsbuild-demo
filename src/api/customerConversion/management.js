import request from '@/utils/request'

const manageApi = {
    getCustomerList: '/client_manager/client/getCustomerList', // 查询客户列表
    setCustomerStage: '/client_manager/client/setCustomerStage', // 设置客户阶段
    save: '/client_transformation/customerstage/save', // 新增
    update: '/client_transformation/customerstage/update', // 修改
    list: '/client_transformation/customerstage/list', // 客户阶段列表查询
    delete: '/client_transformation/customerstage/delete', // 删除
    order: '/client_transformation/customerstage/change/order', // 更改排序
    getAdmins: '/enterprise/staff/getAdmins', // 查询管理员
}

export function getAdmins(parameter) {
    return request({
        url: manageApi.getAdmins,
        method: 'get',
        params: parameter,
    })
}

export function getCustomerList(parameter) {
    return request({
        url: manageApi.getCustomerList,
        method: 'get',
        params: parameter,
    })
}

export function setCustomerStage(parameter) {
    return request({
        url: manageApi.setCustomerStage,
        method: 'post',
        data: parameter,
    })
}

export function manageSave(parameter) {
    return request({
        url: manageApi.save,
        method: 'post',
        data: parameter,
    })
}

export function manageUpdate(parameter) {
    return request({
        url: manageApi.update,
        method: 'post',
        data: parameter,
    })
}

export function manageList(parameter) {
    return request({
        url: manageApi.list,
        method: 'post',
        data: parameter,
    })
}

export function manageDelete(parameter) {
    return request({
        url: manageApi.delete,
        method: 'post',
        data: parameter,
    })
}

export function manageOrder(parameter) {
    return request({
        url: manageApi.order,
        method: 'post',
        params: parameter,
    })
}
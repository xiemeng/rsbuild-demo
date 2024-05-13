import request from '@/utils/request'

const conversionApi = {
    Info: '/client_manager/blacklist/rules/Info', // 获取黑名单规则
    update: '/client_manager/blacklist/rules/update', // 更新黑名单规则
    list: '/client_manager/blacklist/list', // 客户黑名单列表
    save: '/client_manager/blacklist/save', // 添加用户进入黑名单
    Delete: '/client_manager/blacklist/delete', // 移除黑名单用户
    importRecodeList: '/client_manager/blacklist/importRecodeList', // 导入记录列表
    importCustomer: '/client_manager/blacklist/importCustomer', // 导入黑名单客户
    deleteImportRecode: '/client_manager/blacklist/deleteImportRecode', //删除导入记录
    importErrorRecodeList: '/client_manager/blacklist/importErrorRecodeList', //错误详情列表
    exportModel: '/client_manager/blacklist/exportModel', // 导出黑名单导入模板
    exportCustomer: '/client_manager/blacklist/exportCustomer', // 导出excel
}

export function exportCustomer(parameter) {
    return request({
        url: conversionApi.exportCustomer,
        method: 'get',
        params: parameter,
        responseType: 'blob'
    })
}

export function exportModel(parameter) {
    return request({
        url: conversionApi.exportModel,
        method: 'get',
        params: parameter,
        responseType: 'blob'
    })
}

export function importErrorRecodeList(parameter) {
    return request({
        url: conversionApi.importErrorRecodeList,
        method: 'get',
        params: parameter,
    })
}

export function deleteImportRecode(parameter) {
    return request({
        url: conversionApi.deleteImportRecode,
        method: 'post',
        data: parameter,
    })
}

export function importCustomer(parameter) {
    return request({
        url: conversionApi.importCustomer,
        method: 'post',
        data: parameter,
    })
}

export function importRecodeList(parameter) {
    return request({
        url: conversionApi.importRecodeList,
        method: 'get',
        params: parameter,
    })
}

export function Delete(parameter) {
    return request({
        url: conversionApi.Delete,
        method: 'post',
        data: parameter,
    })
}

export function Info(parameter) {
    return request({
        url: conversionApi.Info,
        method: 'get',
        params: parameter,
    })
}

export function update(parameter) {
    return request({
        url: conversionApi.update,
        method: 'post',
        data: parameter,
    })
}

export function list(parameter) {
    return request({
        url: conversionApi.list,
        method: 'post',
        data: parameter,
    })
}

export function save(parameter) {
    return request({
        url: conversionApi.save,
        method: 'post',
        data: parameter,
    })
}

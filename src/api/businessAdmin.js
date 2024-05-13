import request from '@/utils/request'

const roleApi = {
  staff: '/enterprise/role/staff', // 获取同一角色的员工
  roleList: '/enterprise/role', // 获取角色列表
  roleResource: '/enterprise/role/getRoleResource', // 根据角色获取权限列表
  syncAll: '/enterprise/staff/syncAll', // 同步数据
  getCustGrpList: '/client_group/customerGroup/getCustGrpList', // 查询群列表
  changeRole: '/enterprise/role/change', // 切换员工角色
  departmentStaff: '/enterprise/department/staff', // 获取所有部门下的员工
  addStaffRole: '/enterprise/role/addStaffRole', // 添加 普通员工/部门管理员/管理员
  getQuitStaff: '/client_manager/transfer/getQuitStaff', //获取离职员工
  getStaff: '/enterprise/staff/get', // 获取全部员工
  department: '/enterprise/department', // 获取部门列表
  getDepartmentStaff: '/enterprise/department/getStaff', // 通过部门id获取成员
  loginAdmin: '/enterprise/staff/loginAdmin', // 当前登入的员工
  getRoleRes: '/enterprise/role/getRoleRes', // 角色获取权限
  changeRes: '/enterprise/role/change/res', // 修改多个员工权限
  getPermissionLog: '/enterprise/permissionLog/query', // 获取权限操作日志
  staffInfo: '/enterprise/staff/statistics/get/staffInfo', // 获取员工基本信息、客户总数、新增
  yesterdayData: '/enterprise/staff/statistics/get/yesterdayData', // 通过id获取昨天数据
  getDate: '/enterprise/staff/statistics/get/date', // 通过id获取指定时间数据


  editDelConfig: '/client_manager/customerdelremind/editDelConfig', // 删人提醒-修改删人提醒配置
  queryDelConfig: '/client_manager/customerdelremind/queryDelConfig', // 删人提醒-查询删人配置
  customStage: '/enterprise/staff/statistics/get/stage', //获取客户阶段数据
  idOrUserIdGet: '/enterprise/staff/idOrUserIdGet', //根据员工id查信息
  staffOKR: '/enterprise/staffOKR/staffOKR', //获取okr下拉框的
  saveOKR: '/enterprise/staffOKR/save', //保存okr
  getStaffOKRList: '/enterprise/staffOKR/getStaffOKRList', //得到okr列表
  getRepeatList: '/enterprise/staffOKR/getRepeatList', //得到okr重复列表
  checkTime: 'enterprise/staffOKR/checkTime', // 校验
  delOkr: '/enterprise/staffOKR/del', // 删除okr
  modify: '/enterprise/staffOKR/modify', // 编辑okr
}

export function idOrUserIdGet(parameter) {
  return request({
    url: roleApi.idOrUserIdGet,
    method: 'get',
    params: parameter,
  })
}


export function customStage(parameter) {
  return request({
    url: roleApi.customStage,
    method: 'get',
    params: parameter,
  })
}

export function loginAdmin(parameter) {
  return request({
    url: roleApi.loginAdmin,
    method: 'get',
    params: parameter,
  })
}

export function getCustGrpList(parameter) {
  return request({
    url: roleApi.getCustGrpList,
    method: 'post',
    data: parameter,
  })
}

export function getQuitStaff(parameter) {
  return request({
    url: roleApi.getQuitStaff,
    method: 'get',
    params: parameter,
  })
}

export function staff(parameter) {
  return request({
    url: roleApi.staff,
    method: 'get',
    params: parameter,
  })
}

export function roleList() {
  return request({
    url: roleApi.roleList,
    method: 'get',
  })
}

export function roleResource(parameter) {
  return request({
    url: roleApi.roleResource,
    method: 'get',
    params: parameter,
  })
}

export function department() {
  return request({
    url: roleApi.department,
    method: 'get',
  })
}

export function syncAll() {
  return request({
    url: roleApi.syncAll,
    method: 'get',
  })
}

export function changeRole(parameter) {
  return request({
    url: roleApi.changeRole,
    method: 'get',
    params: parameter,
  })
}

export function departmentStaff() {
  return request({
    url: roleApi.departmentStaff,
    method: 'get',
  })
}

export function addStaffRole(parameter) {
  return request({
    url: roleApi.addStaffRole,
    method: 'post',
    data: parameter
  })
}

export function getStaff(parameter) {
  return request({
    url: roleApi.getStaff,
    method: 'get',
    params: parameter
  })
}

export function editDelConfig(parameter) {
  return request({
    url: roleApi.editDelConfig,
    method: 'post',
    data: parameter
  })
}

export function queryDelConfig(parameter) {
  return request({
    url: roleApi.queryDelConfig,
    method: 'post',
    data: parameter
  })
}

export function getRoleRes(parameter) {
  return request({
    url: roleApi.getRoleRes,
    method: 'get',
    params: parameter
  })
}

export function changeRes(parameter) {
  return request({
    url: roleApi.changeRes,
    method: 'post',
    data: parameter
  })
}

export function getDepartmentStaff(parameter) {
  return request({
    url: roleApi.getDepartmentStaff,
    method: 'get',
    params: parameter
  })
}

export function getPermissionLog(parameter) {
  return request({
    url: roleApi.getPermissionLog,
    method: 'post',
    data: parameter
  })
}

export function staffInfo(parameter) {
  return request({
    url: roleApi.staffInfo,
    method: 'get',
    params: parameter
  })
}

export function yesterdayData(parameter) {
  return request({
    url: roleApi.yesterdayData,
    method: 'get',
    params: parameter
  })
}

export function getDate(parameter) {
  return request({
    url: roleApi.getDate,
    method: 'get',
    params: parameter
  })
}

export function staffOKR(parameter) {
  return request({
    url: roleApi.staffOKR,
    method: 'get',
    params: parameter
  })
}

export function saveOKR(parameter) {
  return request({
    url: roleApi.saveOKR,
    method: 'post',
    data: parameter
  })
}

export function getStaffOKRList(parameter) {
  return request({
    url: roleApi.getStaffOKRList,
    method: 'get',
    params: parameter
  })
}

export function getRepeatList(parameter) {
  return request({
    url: roleApi.getRepeatList,
    method: 'get',
    params: parameter
  })
}

export function checkTime(parameter) {
  return request({
    url: roleApi.checkTime,
    method: 'get',
    params: parameter
  })
}

export function delOkr(parameter) {
  return request({
    url: roleApi.delOkr,
    method: 'post',
    data: parameter
  })
}

export function modify(parameter) {
  return request({
    url: roleApi.modify,
    method: 'post',
    data: parameter
  })
}
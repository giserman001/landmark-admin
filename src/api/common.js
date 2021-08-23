import request from '@/utils/request'

// 登陆file/saveFile
export function login(params) {
  return request({ url: '/user/login', method: 'get', params })
}

// 文件上传
export function saveFile(data) {
  return request({ url: '/file/saveFile', method: 'post', data })
}

// 用户列表
export function getUserList(params) {
  return request({ url: '/user/getUserList', method: 'get', params })
}

// 角色列表(包含下拉框)
export function getRoleList(params) {
  return request({ url: '/role/getRoleList', method: 'get', params })
}

// 添加用户
export function saveUser(params) {
  return request({ url: '/user/saveUser', method: 'get', params })
}

// 编辑用户
export function updataUserById(params) {
  return request({ url: '/user/updateUserById', method: 'get', params })
}

// 删除用户
export function deteleUserById(params) {
  return request({ url: '/user/deteleUserById', method: 'get', params })
}

// 添加角色
export function saveRole(params) {
  return request({ url: '/role/saveRole', method: 'get', params })
}

// 编辑角色
export function updataRoleById(params) {
  return request({ url: '/role/updateRoleById', method: 'get', params })
}

// 删除角色
export function deteleRoleById(params) {
  return request({ url: '/user/deteleRoleById', method: 'get', params })
}

// 获取所有页面
export function getAllPageAuth(params) {
  return request({ url: '/role/getAllPage', method: 'get', params })
}

// 获取角色权限信息
export function getPageByRoleId(params) {
  return request({ url: '/role/getPageByRoleId', method: 'get', params })
}

// 修改角色权限信息
export function updateRolePageForRoleId(params) {
  return request({ url: '/role/updateRolePageForRoleId', method: 'get', params })
}

// 获取项目列表
export function getProjectList(params) {
  return request({ url: '/project/getProjectList', method: 'get', params })
}

// 添加项目
export function saveProject(params) {
  return request({ url: '/project/saveProject', method: 'get', params })
}

// 编辑项目
export function updateProject(params) {
  return request({ url: '/project/updateProject', method: 'get', params })
}

// 删除项目
export function deteleProjectById(params) {
  return request({ url: '/project/deteleProjectById', method: 'get', params })
}

// 获取业主单位下拉框信息
export function getOwnerIdAndName(params) {
  return request({ url: '/owner/getOwnerIdAndName', method: 'get', params })
}

// 获取实施单位下拉框信息
export function getExecuteIdAndName(params) {
  return request({ url: '/execute/getExecuteIdAndName', method: 'get', params })
}

// 根据文件ids获取文件
export function getFiles(params) {
  return request({ url: '/file/getFilesByIds', method: 'get', params })
}

// 获取子项信息
export function getProjectSonList(params) {
  return request({ url: '/project/son/getProjectSonList', method: 'get', params })
}

// 添加子项目
export function saveProjectSon(data) {
  return request({ url: '/project/son/saveProjectSon', method: 'post', data })
}

// 编辑子项目
export function updateProjectSon(data) {
  return request({ url: '/project/son/updateProjectSon', method: 'post', data })
}

// 删除子项目
export function deteleProjectSonById(params) {
  return request({ url: '/project/son/deteleProjectSonById', method: 'get', params })
}

// 根据业主单位id获取业主单位信息
export function getOwnerById(params) {
  return request({ url: '/owner/getOwnerById', method: 'get', params })
}

// 根据实施单位id获取业主单位信息
export function getExecuteById(params) {
  return request({ url: '/execute/getExecuteById', method: 'get', params })
}

// 获取实施单位项目组成员信息
export function getListByTypeAndComId(params) {
  return request({ url: 'staffInfo/getListByTypeAndComId', method: 'get', params })
}

// 根据职工id获取职工信息
export function staffInfoById(params) {
  return request({ url: '/staffInfo/getById', method: 'get', params })
}

// 获取单体建筑信息列表
export function getProjectArchitectureList(params) {
  return request({ url: '/project/architecture/getProjectArchitectureList', method: 'get', params })
}

// 添加单体建筑
export function saveArchitecture(data) {
  return request({ url: '/project/architecture/saveArchitecture', method: 'post', data })
}

// 修改单体建筑
export function updateArchitecture(data) {
  return request({ url: '/project/architecture/updateArchitecture', method: 'post', data })
}

// 删除单体建筑
export function deteleArchitectureById(params) {
  return request({ url: '/project/architecture/deteleArchitectureById', method: 'get', params })
}

// 单体建筑详情
export function getArchitectureById(params) {
  return request({ url: '/project/architecture/getById', method: 'get', params })
}

// 获取日报列表
export function getDayReportList(params) {
  return request({ url: '/dayReport/getDayReportList', method: 'get', params })
}

// 添加日报
export function saveDayReport(params) {
  return request({ url: '/dayReport/saveDayReport', method: 'get', params })
}

// 编辑日报
export function updateDayReport(params) {
  return request({ url: '/dayReport/updateDayReport', method: 'get', params })
}

// 编辑日报
export function deteleDayReportById(params) {
  return request({ url: '/dayReport/deteleDayReportById', method: 'get', params })
}

// 获取周报列表
export function getWeekReportList(params) {
  return request({ url: '/weekReport/getWeekReportList', method: 'get', params })
}

// 新增周报
export function saveWeekReport(data) {
  return request({ url: '/weekReport/saveWeekReport', method: 'post', data, headers: { 'Content-Type': 'application/json;charset=UTF-8' }})
}

// 删除周报
export function deteleWeekReportById(params) {
  return request({ url: '/weekReport/deteleDayReportById', method: 'get', params })
}

// 修改周报
export function updateWeekReport(params) {
  return request({ url: '/weekReport/updateWeekReport', method: 'get', params })
}

// 修改周报明细
export function updateWeekReportRecord(data) {
  return request({ url: '/weekReport/updateWeekReportRecord', method: 'post', data, headers: { 'Content-Type': 'application/json;charset=UTF-8' }})
}

// 获取周报详情
export function getWeekReportByIdDetail(params) {
  return request({ url: '/weekReport/getWeekReportRecordList', method: 'get', params })
}

// 获取月报列表
export function getMonthReportList(params) {
  return request({ url: '/monthReport/getMonthReportList', method: 'get', params })
}

// 删除月报
export function deteleMonthReportById(params) {
  return request({ url: '/monthReport/deteleMonthReportById', method: 'get', params })
}

// 编辑月报
export function updateMonthReport(params) {
  return request({ url: '/monthReport/updateMonthReport', method: 'get', params })
}

// 新增月报
export function saveMonthReport(params) {
  return request({ url: '/monthReport/saveMonthReport', method: 'get', params })
}

// 季报

// 获取季报列表
export function getQuarterReportList(params) {
  return request({ url: '/quarterReport/getQuarterReportList', method: 'get', params })
}

// 删除季报
export function deteleQuarterReportById(params) {
  return request({ url: '/quarterReport/deteleQuarterReportById', method: 'get', params })
}

// 编辑季报
export function updateQuarterReport(params) {
  return request({ url: '/quarterReport/updateQuarterReport', method: 'get', params })
}

// 新增季报
export function saveQuarterReport(params) {
  return request({ url: '/quarterReport/saveQuarterReport', method: 'get', params })
}

// 年报

// 获取年报列表
export function getYearReportList(params) {
  return request({ url: '/yearReport/getYearReportList', method: 'get', params })
}

// 删除年报
export function deteleYearReportById(params) {
  return request({ url: '/yearReport/deteleYearReportById', method: 'get', params })
}

// 编辑年报
export function updateYearReport(params) {
  return request({ url: '/yearReport/updateYearReport', method: 'get', params })
}

// 新增年报
export function saveYearReport(params) {
  return request({ url: '/yearReport/saveYearReport', method: 'get', params })
}

// 通过项目id获取子项下拉框
export function getProjectSonIdAndName(params) {
  return request({ url: '/weekReport/getProjectSonIdAndName', method: 'get', params })
}

// 通过子项id获取子项下拉框
export function getArchitectureIdAndName(params) {
  return request({ url: '/weekReport/getArchitectureIdAndName', method: 'get', params })
}

// 职工信息

// 获取职工列表
export function getStaffInfoList(params) {
  return request({ url: '/staffInfo/getStaffInfoList', method: 'get', params })
}

// 新增职工
export function saveStaffInfo(params) {
  return request({ url: '/staffInfo/saveStaffInfo', method: 'get', params })
}

// 编辑职工
export function updateStaffInfo(params) {
  return request({ url: '/staffInfo/updateStaffInfo', method: 'get', params })
}

// 删除职工
export function deteleStaffInfoById(params) {
  return request({ url: '/staffInfo/deteleStaffInfoById', method: 'get', params })
}

// 业主单位模块接口

// 业主单位列表
export function getOwnerList(params) {
  return request({ url: '/owner/getOwnerList', method: 'get', params })
}

// 删除业主单位
export function deteleOwnerById(params) {
  return request({ url: '/owner/deteleOwnerById', method: 'get', params })
}

// 添加业主单位
export function saveOwner(params) {
  return request({ url: '/owner/saveOwner', method: 'get', params })
}

// 修改业主单位
export function updateOwner(params) {
  return request({ url: '/owner/updateOwner', method: 'get', params })
}

// 实施单位模块接口

// 实施单位列表
export function getExecuteList(params) {
  return request({ url: '/execute/getExecuteList', method: 'get', params })
}

// 删除实施单位
export function deteleExecuteById(params) {
  return request({ url: '/execute/deteleExecuteById', method: 'get', params })
}

// 添加实施单位
export function saveExecute(params) {
  return request({ url: '/execute/saveExecute', method: 'get', params })
}

// 修改实施单位
export function updateExecute(params) {
  return request({ url: '/execute/updateExecute', method: 'get', params })
}

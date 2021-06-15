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

// 根据文件ids下载文件
export function downLoadFile(params) {
  return request({ url: '/file/getFilesByIds', method: 'get', params })
}


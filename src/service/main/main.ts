import CMSRequest from '..'

// 获取角色列表
export function getEntireRoles() {
  return CMSRequest.post({
    url: '/role/list',
  })
}

export function getEntireDepartments() {
  return CMSRequest.post({
    url: '/department/list',
  })
}

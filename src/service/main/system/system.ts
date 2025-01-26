import cmsRequest from '@/service'

// 用户的网络请求
// 查询用户列表
export function postUserListData(queryInfo: any) {
  return cmsRequest.post({
    url: '/users/list',
    data: queryInfo,
  })
}
// 删除所选id的当行的用户数据
export function deleteUserById(id: number) {
  return cmsRequest.delete({
    url: `/users/${id}`,
  })
}

export function newUserData(userInfo: any) {
  return cmsRequest.post({
    url: '/users',
    data: userInfo,
  })
}

// 编辑用户数据
export function editUserData(id: number, userInfo: any) {
  return cmsRequest.patch({
    url: `/users/${id}`,
    data: userInfo,
  })
}

// 针对页面的网络请求：增删改查
export function postPageListData(pageName: string, queryInfo: any) {
  return cmsRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo,
  })
}

export function newPageData(pageName: string, pageInfo: any) {
  return cmsRequest.post({
    url: `/${pageName}`,
    data: pageInfo,
  })
}

export function deletePageDataById(pageName: string, id: number) {
  return cmsRequest.delete({
    url: `/${pageName}/${id}`,
  })
}

export function editPageData(pageName: string, id: number, pageInfo: any) {
  return cmsRequest.patch({
    url: `/${pageName}/${id}`,
    data: pageInfo,
  })
}

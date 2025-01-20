import cmsRequest from '@/service'

// 用户的网络请求
export function postUserListData() {
  return cmsRequest.post({
    url: '/users/list',
    data: {
      offset: 0,
      size: 10,
    },
  })
}

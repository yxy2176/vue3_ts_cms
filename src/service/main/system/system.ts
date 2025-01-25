import cmsRequest from '@/service'

// 用户的网络请求
export function postUserListData(queryInfo: any) {
  return cmsRequest.post({
    url: '/users/list',
    // data: {
    //   offset: 0,
    //   size: 10,
    // },
    data: queryInfo,
  })
}

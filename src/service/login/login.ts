import type { IAccount } from '@/types'
import cmsRequest from '..'

export function accountLoginRequest(account: IAccount) {
  return cmsRequest.post({
    url: '/login',
    data: account,
  })
}

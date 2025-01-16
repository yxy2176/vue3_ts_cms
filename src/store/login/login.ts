import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId,
} from '@/service/login/login'
import type { IAccount } from '@/types'
import { defineStore } from 'pinia'
import { localCache } from '../../utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: '',
    userMenus: '',
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1、帐号登录，获取token等信息
      const loginResult = await accountLoginRequest(account)
      // console.log(loginResult)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 2、获取所登录的用户的详细信息（比如角色等等）
      const userInfoResult = await getUserInfoById(id)
      // console.log('userInfoResult: ', userInfoResult);
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      // 3、根据用户所处的角色 id 请求用户对应的权限（菜单menus）
      const userMenusResult = await getUserMenusByRoleId(
        this.userInfo.role.id,
      )
      // console.log('userMenusResult: ', userMenusResult)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus

      // 4、进行本地缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)

      // 5、进行页面跳转
      router.push('/main')
    },
  },
})

export default useLoginStore

import { accountLoginRequest } from '@/service/login/login'
import type { IAccount } from '@/types'
import { defineStore } from 'pinia'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    token: '',
    name: '',
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginResult = await accountLoginRequest(account)
      console.log(loginResult)
    },
  },
})

export default useLoginStore

import { postUserListData } from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,
  }),
  actions: {
    async postUserListAction(queryInfo: any) {
      const userList = await postUserListData(queryInfo)
      console.log('userList: ', userList)
      const { totalCount, list } = userList.data
      this.usersList = list
      this.usersTotalCount = totalCount
    },
  },
})

export default useSystemStore

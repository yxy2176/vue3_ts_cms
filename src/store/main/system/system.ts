import {
  deleteUserById,
  editUserData,
  newUserData,
  postUserListData,
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,
  }),
  actions: {
    // 提交刷新用户数据
    async postUserListAction(queryInfo: any) {
      const userList = await postUserListData(queryInfo)
      // console.log('userList: ', userList)
      const { totalCount, list } = userList.data
      this.usersList = list
      this.usersTotalCount = totalCount
    },
    // 删除用户
    async deleteUserByIdAction(id: number) {
      const deleteResult = await deleteUserById(id)
      console.log('deleteResult: ', deleteResult)
      // 重新获取列表数据
      this.postUserListAction({
        offset: 0,
        size: 10,
      })
    },

    // 新建用户
    async newUserDataAction(userInfo: any) {
      const newResult = await newUserData(userInfo)
      console.log('newResult: ', newResult)
      // 重新获取列表数据
      this.postUserListAction({
        offset: 0,
        size: 10,
      })
    },

    // 编辑用户
    async editUserDataAction(id: number, userInfo: any) {
      const editResult = await editUserData(id, userInfo)
      console.log('editResult: ', editResult)

      this.postUserListAction({
        offset: 0,
        size: 10,
      })
    },
  },
})

export default useSystemStore

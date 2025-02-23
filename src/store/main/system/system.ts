import {
  deletePageDataById,
  deleteUserById,
  editPageData,
  editUserData,
  newPageData,
  newUserData,
  postPageListData,
  postUserListData,
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'
import useMainStore from '../main'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    // user页面的state
    usersList: [],
    usersTotalCount: 0,
    // 通用页面的state
    pageList: [],
    pageTotalCount: 0,
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
      // console.log('deleteResult: ', deleteResult)
      // 重新获取列表数据
      this.postUserListAction({
        offset: 0,
        size: 10,
      })
    },

    // 新建用户
    async newUserDataAction(userInfo: any) {
      const newResult = await newUserData(userInfo)
      // console.log('newResult: ', newResult)
      // 重新获取列表数据
      this.postUserListAction({
        offset: 0,
        size: 10,
      })
    },

    // 编辑用户
    async editUserDataAction(id: number, userInfo: any) {
      const editResult = await editUserData(id, userInfo)
      // console.log('editResult: ', editResult)

      this.postUserListAction({
        offset: 0,
        size: 10,
      })
    },

    // 针对页面的数据的增删改查的action
    async postPagelistAction(pageName: string, queryInfo: any) {
      const pageList = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageList.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },

    async deletePageDataByIdAction(pageName: string, id: number) {
      const deleteResult = await deletePageDataById(pageName, id)
      console.log('deleteResult: ', deleteResult)
      this.postPagelistAction(pageName, { offset: 0, size: 10 })

      // 获取完整的权限
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },

    async newPageDataAction(pageName: string, pageInfo: any) {
      const newResult = await newPageData(pageName, pageInfo)
      console.log('newResult: ', newResult)
      this.postPagelistAction(pageName, { offset: 0, size: 10 })
    },

    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const editResult = await editPageData(pageName, id, pageInfo)
      console.log('editResult: ', editResult)
      this.postPagelistAction(pageName, { offset: 0, size: 10 })
    },
  },
})

export default useSystemStore

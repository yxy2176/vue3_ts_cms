import { postUserListData } from "@/service/main/system/system";
import { defineStore } from "pinia";
import type { ISystemState } from "./type";

const useSystemStore = defineStore('system',{
  state:(): ISystemState=>({
    usersList:[],
    usersTotalCount:0
  }),
  actions:{
    async postUserListAction(){
      const userList = await postUserListData()
      const {totalCount, list} = userList.data
      this.usersList = list
      this.usersTotalCount = totalCount
    }
  }
})

export default useSystemStore

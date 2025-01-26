import { getEntireDepartments, getEntireRoles } from '@/service/main/main'
import { defineStore } from 'pinia'

interface IMainStore {
  entireRoles: any[]
  entireDepartments: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainStore => ({
    entireRoles: [],
    entireDepartments: [],
  }),
  actions: {
    async fetchEntireDataAction() {
      const roleRusult = await getEntireRoles()
      console.log('roleRusult: ', roleRusult)
      const departmentResult = await getEntireDepartments()
      console.log('departmentResult: ', departmentResult)

      this.entireRoles = roleRusult.data.list
      this.entireDepartments = departmentResult.data.list
    },
  },
})

export default useMainStore

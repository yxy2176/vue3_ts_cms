import { getEntireDepartments, getEntireRoles, getEntireMenus } from '@/service/main/main'
import { defineStore } from 'pinia'

interface IMainStore {
  entireRoles: any[]
  entireDepartments: any[]
  entireMenus: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainStore => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenus: [],
  }),
  actions: {
    async fetchEntireDataAction() {
      const roleRusult = await getEntireRoles()
      const departmentResult = await getEntireDepartments()
      const menuResult = await getEntireMenus()

      this.entireRoles = roleRusult.data.list
      this.entireDepartments = departmentResult.data.list
      this.entireMenus = menuResult.data.list
    },
  },
})

export default useMainStore

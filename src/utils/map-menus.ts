import type { RouteRecordRaw } from 'vue-router'

// 动态获取所有的路由对象，并放到localRoutes该数组中
function loadLocalRoutes() {
  const localRoutes: RouteRecordRaw[] = []

  // 1：读取router/main当中所有的路由ts文件
  const files: Record<string, any> = import.meta.glob('../router/main/**/**.ts', {
    eager: true,
  })
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}

export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]) {
  // 1、加载 本地路由 对象
  const localRoutes = loadLocalRoutes()

  // 2、根据菜单去匹配正确的路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      const route = localRoutes.find((item) => item.path === subMenu.url)
      if (route) {
        // 1）给route的顶层菜单增加重定向的功能（但仅需增加一次就可以了）
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }

        // 将二级菜单对应的路径添加进去
        routes.push(route)
      }
      // 记录第一个被匹配到的路由
      if (!firstMenu && route) firstMenu = subMenu
    }
  }
  return routes
}

/**
 * 根据路径去匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有的菜单
 */
export function mapPathToMenus(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) return subMenu
    }
  }
}

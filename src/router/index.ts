import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main',
    },
    {
      path: '/login',
      component: () => import('../views/login/Login.vue'),
    },
    {
      path: '/main',
      component: () => import('../views/main/cmsMain.vue'),
      children: [
        {
          path: '/main/analysis/overview',
          component: () =>
            import('../views/main/analysis/overview/overview.vue'),
        },
        {
          path: '/main/analysis/dashboard',
          component: () =>
            import('../views/main/analysis/dashboard/dashboard.vue'),
        },
        {
          path: '/main/system/user',
          component: () =>
            import('../views/main/system/user/user.vue'),
        },
        {
          path: '/main/system/role',
          component: () =>
            import('../views/main/system/role/role.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue'),
    },
  ],
})

// 导航守卫
router.beforeEach((to)=>{
  // 只有登陆成功（有token），才能真正进入到main页面  =》 不然返回登录页面
  const token = localCache.getCache(LOGIN_TOKEN)
  if(to.path.startsWith('/main') && !token){
    // 是return, 而不是router.push
    return '/login'
  }
})

export default router

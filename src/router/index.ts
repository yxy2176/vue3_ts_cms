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
      component: () => import('../views/login/cmsLogin.vue'),
    },
    {
      path: '/main',
      component: () => import('../views/main/cmsMain.vue'),
    },
    {
      path:'/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue')
    },
  ],
})

// 导航守卫

export default router
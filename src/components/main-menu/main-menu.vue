<template>
  <div class="main-menu">
    <!-- 1、logo -->
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 class="title">后台管理系统</h2>
    </div>

    <!-- 2、menu部分 -->
    <div class="menu">
      <el-menu
        default-active="2"
        :collapse="isFold"
        text-color="#b7bdc3"
        background-color="#001529"
        active-text-color="#fff"
      >
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <components :is="item.icon.split('-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children">
              <el-menu-item
                :index="subItem.id"
                @click="handleItemClick(subItem)"
              >
                {{ subItem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>
<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import { useRouter } from 'vue-router'

// 0、定义Props
defineProps({
  isFold: {
    type: Boolean,
    default: false,
  },
})

// 1、获取登录用户所在角色的动态菜单
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus

// 2、监听菜单item的点击
const router = useRouter()
function handleItemClick(item: any) {
  // console.log('item:', item)
  const url= item.url
  router.push(url)
}
</script>
<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  flex-direction: row;
  height: 20px;
  align-items: center;
  justify-content: start;
  padding: 12px 10px 8px 10px;
  .img {
    height: 100%;
    margin: 0 10px;
  }
  .title {
    color: white;
    font-size: 16px;
    font-weight: 700;
    white-space: nowrap;
    margin-left: 14px;
    margin-bottom: 3px;
  }
}
</style>

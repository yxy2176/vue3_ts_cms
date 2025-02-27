<template>
  <div class="header-info">
    <!-- 1、操作小图标-->
    <div class="operation">
      <span>
        <el-icon><Message /></el-icon>
      </span>
      <span>
        <span class="dot"></span>
        <el-icon><ChatDotRound /></el-icon>
      </span>
      <span>
        <el-icon><Search /></el-icon>
      </span>
      <el-switch
        v-model="isDark"
        inline-prompt
        active-text="dark"
        size="large"
        inactive-text="light"
        @change="toggleDark($event as boolean)"
      />
    </div>

    <!-- 2、个人信息 -->
    <div class="info">
      <el-dropdown>
        <span class="user-info">
          <el-avatar
            :size="30"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <span class="name">JennyYao</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick">
              <el-icon><CircleClose /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><InfoFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Unlock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'

const router = useRouter()
function handleExitClick() {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}

// 暗黑模式切换
const isDark = useDark()
// const isDark = useDark({
//   selector: 'div',
//   attribute: 'color-scheme',
//   valueDark: 'dark',
//   valueLight: 'light',
// })
const toggleDark = useToggle(isDark)
// const toggleDark = (value: boolean) => {
//   isDark.value = value
//   // 其他逻辑，如保存到 localStorage 或切换主题
// }
</script>
<style lang="less" scoped>
.header-info {
  display: flex;
  align-items: center;
}

.operation {
  display: inline-flex;
  margin-right: 20px;
  span {
    position: relative;
    display: flex;
    align-items: center;
    width: 40px;
    height: 35px;

    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      background-color: red;
      z-index: 10;
      width: 6px;
      height: 6px;
      border-radius: 100%;
    }
  }
}

.info {
  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}

.name {
  margin-left: 5px;
}
</style>

<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isFold ? '60px' : '210px'">
        <main-menu></main-menu>
      </el-aside>
      <el-container>
        <el-header>
          <main-header @fold-change="handleFoldChange"></main-header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import mainMenu from '@/components/main-menu/main-menu.vue'
import mainHeader from '@/components/main-header/main-header.vue'
import { ref } from 'vue'

//处理main-header中折叠状态的变化
const isFold = ref(false)
function handleFoldChange(flag: boolean) {
  isFold.value = flag
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;
}

.main-content {
  height: 100%;
}

.el-main {
  background-color: #f0f2f5;
}
</style>

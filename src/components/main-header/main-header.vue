<template>
  <div>
    <div class="main-header">
      <div class="menu-icon" @click="handleMenuIconClick">
        <el-icon>
          <component :is="isFold ? 'Expand' : 'Fold'" />
        </el-icon>
      </div>
      <div class="content">
        <header-crumb></header-crumb>
        <header-info></header-info>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import headerInfo from './c-cpns/header-info.vue'
import headerCrumb from './c-cpns/header-crumb.vue'

// 0、自定义内部事件
const emit = defineEmits(['foldChange'])

// 1、记录是否折叠menu的状态
const isFold = ref(false)
function handleMenuIconClick() {
  // （1）内部改变状态
  isFold.value = !isFold.value
  // （2）将事件和对应状态传递给父组件
  emit('foldChange', isFold.value)
}
</script>
<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  height: 100%;
  // flex: 1;
  .menu-icon {
    display: flex;
    align-items: center;
    // 改变鼠标指针的样式 ： 当鼠标指针悬停在该元素上时，鼠标指针会变成一个手形指针
    cursor: pointer;
  }
  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    padding: 0 18px;
  }
}
</style>

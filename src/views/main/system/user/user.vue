<template>
  <div class="user">
    <user-search @reset-click="handleResetClick" @query-click="handleQueryClick"></user-search>
    <user-content ref="contentRef"></user-content>
  </div>
</template>
<script setup lang="ts">
import userSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
import { ref } from 'vue'

const contentRef = ref<InstanceType<typeof userContent>>()
// serarch模块
// 1.1 重置按钮的点击
function handleResetClick() {
  contentRef.value?.fetchUserListData()
}
// 1.2 查询按钮的点击
function handleQueryClick(formData: any) {
  contentRef.value?.fetchUserListData(formData)
}
</script>
<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>

<template>
  <div class="user">
    <user-search @reset-click="handleResetClick" @query-click="handleQueryClick"></user-search>
    <user-content
      ref="contentRef"
      @new-click="handleNewUserClick"
      @edit-click="handleEditUserClick"
    ></user-content>
    <user-modal ref="modalRef"></user-modal>
  </div>
</template>
<script setup lang="ts">
import userSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
import userModal from './c-cpns/user-modal.vue'
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

// 对modal组件的操作
const modalRef = ref<InstanceType<typeof userModal>>()

function handleNewUserClick() {
  modalRef.value?.setModalVisible()
}

function handleEditUserClick() {}
</script>
<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>

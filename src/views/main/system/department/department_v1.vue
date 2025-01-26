<!-- 不使用config时候写的页面 -->
<template>
  <div class="department">
    <page-search @reset-click="handleResetClick" @query-click="handleQueryClick" />
    <page-content ref="contentRef" @edit-click="handleEditClick" @new-click="handleNewClick" />
    <page-modal ref="modalRef" />
  </div>
</template>
<script setup lang="ts">
import pageContent from './c-cpns/page-content.vue'
import pageSearch from './c-cpns/page-search.vue'
import pageModal from './c-cpns/page-modal.vue'
import { ref } from 'vue'

const contentRef = ref<InstanceType<typeof pageContent>>()
// 点击search模块的重置按钮
function handleResetClick() {
  contentRef.value?.fetchPageListData()
}

function handleQueryClick(queryInfo: any) {
  contentRef.value?.fetchPageListData(queryInfo)
}

//content模块的按钮的操作
const modalRef = ref<InstanceType<typeof pageModal>>()
function handleEditClick(itemData: any) {
  modalRef.value?.setModalVisible(false, itemData)
}

function handleNewClick() {
  modalRef.value?.setModalVisible()
}
</script>
<style lang="less" scoped>
.department {
  border-radius: 8px;
  overflow: hidden;
}
</style>

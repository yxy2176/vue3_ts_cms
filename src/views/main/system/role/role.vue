<template>
  <div class="department">
    <page-search
      :search-config="searchConfig"
      @reset-click="handleResetClick"
      @query-click="handleQueryClick"
    />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @edit-click="handleEditClick"
      @new-click="handleNewClick"
    >
    </page-content>
    <page-modal ref="modalRef" :modal-config="modalConfig" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageSearch from '@/components/page-search/page-search.vue'
import pageModal from '@/components/page-modal/page-modal.vue'
import searchConfig from './config/search-config'
import contentConfig from './config/content-config'
import modalConfig from './config/modal-config'

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

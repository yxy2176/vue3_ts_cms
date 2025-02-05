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
    <page-modal ref="modalRef" :modal-config="modalConfig" :other-info="otherInfo">
      <template #menulist>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          :props="{ children: 'children', label: 'name' }"
          node-key="id"
          show-checkbox
          @check="handleElTreeCheck"
        />
      </template>
    </page-modal>
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
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import useMainStore from '@/store/main/main'
import { storeToRefs } from 'pinia'
import type { ElTree } from 'element-plus'

// 点击按钮的逻辑功能
// content部分的点击
const { contentRef, handleResetClick, handleQueryClick } = usePageContent()
// modal部分的点击
const { modalRef, handleEditClick, handleNewClick } = usePageModal(editCallback)

// modal部分的菜单部分
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)
const otherInfo = ref({})

function handleElTreeCheck(currentNode: any, selectedNode: any) {
  // 共两个参数
  // 依次为：传递给 data 属性的数组中该节点所对应的对象、树目前的选中状态对象，
  // 包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性
  const menuList = [...selectedNode.checkedKeys, ...selectedNode.halfCheckedKeys]
  otherInfo.value = { menuList }
}

const treeRef = ref<InstanceType<typeof ElTree>>()
function editCallback(itemData:any){
  
}

</script>
<style lang="less" scoped>
.department {
  border-radius: 8px;
  overflow: hidden;
}
</style>

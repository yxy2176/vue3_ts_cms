import pageContent from '@/components/page-content/page-content.vue'
import { ref } from 'vue'

function usePageContent() {
  const contentRef = ref<InstanceType<typeof pageContent>>()
  // 点击search模块的重置按钮
  function handleResetClick() {
    contentRef.value?.fetchPageListData()
  }

  function handleQueryClick(queryInfo: any) {
    contentRef.value?.fetchPageListData(queryInfo)
  }

  return {
    contentRef,
    handleResetClick,
    handleQueryClick,
  }
}

export default usePageContent

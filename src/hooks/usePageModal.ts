import { ref } from 'vue'
import pageModal from '@/components/page-modal/page-modal.vue'

type EditFnType = (data: any) => void

function usePageModal(editCallBack?: EditFnType) {
  const modalRef = ref<InstanceType<typeof pageModal>>()

  function handleNewClick() {
    modalRef.value?.setModalVisible()
  }

  function handleEditClick(itemData: any) {
    // 1、显示modal模块
    modalRef.value?.setModalVisible(false, itemData)
    // 2、编辑的回调函数
    if (editCallBack) editCallBack(itemData)
  }

  return {
    modalRef,
    handleEditClick,
    handleNewClick,
  }
}

export default usePageModal

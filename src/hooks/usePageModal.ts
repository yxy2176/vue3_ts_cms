import { ref } from 'vue'
import pageModal from '@/components/page-modal/page-modal.vue'

function usePageModal(){
  const modalRef = ref<InstanceType<typeof pageModal>>()
function handleEditClick(itemData: any) {
  modalRef.value?.setModalVisible(false, itemData)
}

function handleNewClick() {
  modalRef.value?.setModalVisible()
}
return {
  modalRef,handleEditClick,handleNewClick
}
}

export default usePageModal


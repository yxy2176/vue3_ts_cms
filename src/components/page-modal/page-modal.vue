<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建部门' : '编辑部门'"
      width="30%"
      center
    >
      <div class="dialogForm">
        <el-form :model="dialogFormData" label-width="70px" size="large">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="dialogFormData.name" placeholder="请输入部门名称" />
          </el-form-item>
          <el-form-item label="部门领导" prop="leader">
            <el-input v-model="dialogFormData.leader" placeholder="请输入部门领导" />
          </el-form-item>
          <el-form-item label="选择部门" prop="parentId">
            <el-select v-model="dialogFormData.parentId" placeholder="请选择部门">
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick"> 确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { ref, reactive } from 'vue'
const dialogVisible = ref(false)
const dialogFormData = reactive<any>({
  name: '',
  leader: '',
  parentId: '',
})
const isNewRef = ref(true)
const editData = ref()
const systemStore = useSystemStore()
const mainStore = useMainStore()

const { entireDepartments } = storeToRefs(mainStore)

function handleConfirmClick() {
  dialogVisible.value = false
  if (!isNewRef.value && editData.value) {
    // 编辑
    systemStore.editPageDataAction('department', editData.value.id, dialogFormData)
  } else {
    // 新建
    systemStore.newPageDataAction('department', dialogFormData)
  }
}

function setModalVisible(isNew: boolean = true, itemData?: any) {
  isNewRef.value = isNew
  dialogVisible.value = true

  if (!isNew && itemData) {
    // 编辑用户 的情况
    for (const key in dialogFormData) {
      dialogFormData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    // 新建用户 的情况
    for (const key in dialogFormData) {
      dialogFormData[key] = ''
    }
    editData.value = null
  }
}

defineExpose({ setModalVisible })
</script>
<style lang="less" scoped>
.dialogForm {
  padding: 5px 20px;
}
</style>

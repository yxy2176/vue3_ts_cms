<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建用户' : '编辑用户'"
      width="30%"
      center
    >
      <div class="dialogForm">
        <el-form :model="dialogFormData" label-width="70px" size="large">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="dialogFormData.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="dialogFormData.realname" placeholder="请输入真实姓名" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="dialogFormData.password" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item label="手机号码" prop="cellphone">
            <el-input v-model="dialogFormData.cellphone" placeholder="请输入手机号码" />
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <!-- <el-input v-model="dialogFormData.roleId" placeholder="请输入角色" /> -->
            <el-select v-model="dialogFormData.roleId" placeholder="请输入角色">
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId">
            <el-select v-model="dialogFormData.departmentId">
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
  realname: '',
  password: '',
  cellphone: '',
  departmentId: '',
  roleId: '',
})
const isNewRef = ref(true)
const editData = ref()
const systemStore = useSystemStore()
const mainStore = useMainStore()

const { entireRoles, entireDepartments } = storeToRefs(mainStore)

function handleConfirmClick() {
  dialogVisible.value = false
  // 编辑
  // systemStore.editUserDataAction(editData.value.id,dialogFormData)
  // 新建
  systemStore.newUserDataAction(dialogFormData)
}

function setModalVisible(isNew: boolean = true, itemData?: any) {
  isNewRef.value = isNew
  dialogVisible.value = true

  if (!isNew && itemData) {
    // 编辑用户 的情况
    for (const key in itemData) {
      dialogFormData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    // 新建用户 的情况
    for (const key in dialogFormData) {
      dialogFormData[key] = ''
    }
  }
  editData.value = null
}

defineExpose({ setModalVisible })
</script>
<style lang="less" scoped>
.dialogForm {
  padding: 5px 20px;
}
</style>
